/**
 * Système d'optimisation avancée des images
 */

interface ImageLoadMetrics {
  url: string
  loadTime: number
  size?: number
  format: string
  success: boolean
  retryCount: number
  timestamp: number
  userAgent: string
  networkType?: string
}

interface ImagePreloadConfig {
  priority: 'high' | 'low'
  formats: string[]
  sizes?: string
}

class ImageOptimizer {
  private static instance: ImageOptimizer
  private metricsQueue: ImageLoadMetrics[] = []
  private preloadedImages = new Set<string>()
  private failedImages = new Map<string, number>()
  private loadingImages = new Map<string, Promise<string | null>>()
  private observer: IntersectionObserver | null = null
  
  // Configuration
  private readonly MAX_RETRY_ATTEMPTS = 3
  private readonly RETRY_DELAY = 1000 // ms
  private readonly METRICS_BATCH_SIZE = 10
  private readonly PRELOAD_BUFFER = 2 // Nombre de sections à précharger
  
  private constructor() {
    this.initializeObserver()
    this.initializeNetworkDetection()
    this.startMetricsReporter()
  }
  
  static getInstance(): ImageOptimizer {
    if (!ImageOptimizer.instance) {
      ImageOptimizer.instance = new ImageOptimizer()
    }
    return ImageOptimizer.instance
  }
  
  /**
   * Initialise l'IntersectionObserver pour le lazy loading intelligent
   */
  private initializeObserver() {
    if (typeof window === 'undefined') return
    
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            const imageUrl = element.dataset.imageUrl
            if (imageUrl) {
              this.preloadNearbyImages(element)
            }
          }
        })
      },
      {
        rootMargin: '50px 0px', // Précharge 50px avant que l'image soit visible
        threshold: 0.01
      }
    )
  }
  
  /**
   * Détecte le type de connexion réseau
   */
  private initializeNetworkDetection() {
    if (typeof window === 'undefined') return
    
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection
    
    if (connection) {
      connection.addEventListener('change', () => {
        this.adjustQualityBasedOnNetwork()
      })
    }
  }
  
  /**
   * Ajuste la qualité des images selon le réseau
   */
  private adjustQualityBasedOnNetwork(): string {
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection
    
    if (!connection) return 'high'
    
    const effectiveType = connection.effectiveType
    const saveData = connection.saveData
    
    if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
      return 'low'
    } else if (effectiveType === '3g') {
      return 'medium'
    }
    
    return 'high'
  }
  
  /**
   * Détermine le meilleur format d'image supporté
   */
  getBestImageFormat(): string {
    if (typeof window === 'undefined') return 'webp'
    
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 1
    
    // Test AVIF
    if (canvas.toDataURL('image/avif').indexOf('image/avif') === 5) {
      return 'avif'
    }
    
    // Test WebP
    if (canvas.toDataURL('image/webp').indexOf('image/webp') === 5) {
      return 'webp'
    }
    
    return 'jpg'
  }
  
  /**
   * Construit l'URL optimisée selon le contexte
   */
  getOptimizedImageUrl(
    baseUrl: string,
    options: {
      width?: number
      quality?: 'low' | 'medium' | 'high'
      format?: string
    } = {}
  ): string {
    const quality = options.quality || this.adjustQualityBasedOnNetwork()
    const format = options.format || this.getBestImageFormat()
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    
    // Ajuste la largeur pour mobile
    const width = options.width || (isMobile ? 200 : 400)
    
    // Remplace l'extension par le format optimal
    let optimizedUrl = baseUrl.replace(/\.(jpg|jpeg|png|webp)$/i, `.${format}`)
    
    // Ajoute les paramètres de qualité (si votre CDN le supporte)
    const qualityMap = {
      low: 60,
      medium: 75,
      high: 85
    }
    
    // Si vous utilisez un service comme Cloudinary ou similaire
    // optimizedUrl += `?w=${width}&q=${qualityMap[quality]}&fm=${format}`
    
    return optimizedUrl
  }
  
  /**
   * Charge une image avec retry et métriques
   */
  async loadImageWithMetrics(
    url: string,
    retryCount = 0
  ): Promise<string | null> {
    // Vérifier si déjà en cours de chargement
    if (this.loadingImages.has(url)) {
      return this.loadingImages.get(url)!
    }
    
    const startTime = performance.now()
    const loadPromise = this.loadImageInternal(url, retryCount, startTime)
    
    this.loadingImages.set(url, loadPromise)
    const result = await loadPromise
    this.loadingImages.delete(url)
    
    return result
  }
  
  private async loadImageInternal(
    url: string,
    retryCount: number,
    startTime: number
  ): Promise<string | null> {
    try {
      const img = new Image()
      
      const loadPromise = new Promise<string>((resolve, reject) => {
        img.onload = () => resolve(url)
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`))
        img.src = url
      })
      
      const result = await loadPromise
      
      // Enregistrer les métriques de succès
      this.recordMetric({
        url,
        loadTime: performance.now() - startTime,
        format: this.getFormatFromUrl(url),
        success: true,
        retryCount,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        networkType: this.getNetworkType()
      })
      
      this.preloadedImages.add(url)
      return result
      
    } catch (error) {
      // Retry logic
      if (retryCount < this.MAX_RETRY_ATTEMPTS) {
        console.debug(`Retrying image load (${retryCount + 1}/${this.MAX_RETRY_ATTEMPTS}): ${url}`)
        
        await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY * (retryCount + 1)))
        return this.loadImageWithMetrics(url, retryCount + 1)
      }
      
      // Enregistrer les métriques d'échec
      this.recordMetric({
        url,
        loadTime: performance.now() - startTime,
        format: this.getFormatFromUrl(url),
        success: false,
        retryCount,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        networkType: this.getNetworkType()
      })
      
      this.failedImages.set(url, Date.now())
      return null
    }
  }
  
  /**
   * Précharge les images populaires au démarrage
   */
  async preloadPopularImages(items: Array<{ name: string; category: string; isPopular?: boolean }>) {
    const popularItems = items.filter(item => item.isPopular)
    const preloadPromises = popularItems.slice(0, 10).map(item => {
      const url = this.buildImageUrl(item.name, item.category)
      return this.preloadImage(url, { priority: 'high' })
    })
    
    await Promise.allSettled(preloadPromises)
  }
  
  /**
   * Précharge une image
   */
  async preloadImage(url: string, config?: ImagePreloadConfig): Promise<void> {
    if (this.preloadedImages.has(url)) return
    
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = this.getOptimizedImageUrl(url)
    
    if (config?.priority === 'high') {
      link.setAttribute('fetchpriority', 'high')
    }
    
    if (config?.sizes) {
      link.setAttribute('imagesizes', config.sizes)
    }
    
    document.head.appendChild(link)
    this.preloadedImages.add(url)
  }
  
  /**
   * Précharge les images proches d'un élément
   */
  private preloadNearbyImages(element: HTMLElement) {
    const parent = element.closest('[data-image-group]')
    if (!parent) return
    
    const images = parent.querySelectorAll('[data-image-url]')
    const currentIndex = Array.from(images).indexOf(element)
    
    // Précharge les N prochaines images
    for (let i = 1; i <= this.PRELOAD_BUFFER; i++) {
      const nextIndex = currentIndex + i
      if (nextIndex < images.length) {
        const nextElement = images[nextIndex] as HTMLElement
        const nextUrl = nextElement.dataset.imageUrl
        if (nextUrl && !this.preloadedImages.has(nextUrl)) {
          this.preloadImage(nextUrl, { priority: 'low' })
        }
      }
    }
  }
  
  /**
   * Observe un élément pour le lazy loading
   */
  observe(element: HTMLElement) {
    this.observer?.observe(element)
  }
  
  /**
   * Arrête d'observer un élément
   */
  unobserve(element: HTMLElement) {
    this.observer?.unobserve(element)
  }
  
  /**
   * Enregistre une métrique
   */
  private recordMetric(metric: ImageLoadMetrics) {
    this.metricsQueue.push(metric)
    
    if (this.metricsQueue.length >= this.METRICS_BATCH_SIZE) {
      this.flushMetrics()
    }
  }
  
  /**
   * Envoie les métriques au serveur
   */
  private async flushMetrics() {
    if (this.metricsQueue.length === 0) return
    
    const metrics = [...this.metricsQueue]
    this.metricsQueue = []
    
    try {
      // Envoyer les métriques à votre endpoint d'analytics
      if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
        await fetch('/api/analytics/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ metrics })
        })
      }
    } catch (error) {

      // Remettre les métriques dans la queue pour réessayer
      this.metricsQueue.unshift(...metrics)
    }
  }
  
  /**
   * Démarre le reporter de métriques
   */
  private startMetricsReporter() {
    if (typeof window === 'undefined') return
    
    // Envoyer les métriques toutes les 30 secondes
    setInterval(() => this.flushMetrics(), 30000)
    
    // Envoyer les métriques quand la page se ferme
    window.addEventListener('beforeunload', () => this.flushMetrics())
  }
  
  /**
   * Obtient le type de réseau
   */
  private getNetworkType(): string {
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection
    
    return connection?.effectiveType || 'unknown'
  }
  
  /**
   * Extrait le format depuis l'URL
   */
  private getFormatFromUrl(url: string): string {
    const match = url.match(/\.([^.]+)$/)
    return match ? match[1] : 'unknown'
  }
  
  /**
   * Construit l'URL d'une image
   */
  private buildImageUrl(name: string, category: string): string {
    const normalizedName = name.toLowerCase().replace(/\s+/g, '-')
    const normalizedCategory = category.toLowerCase().replace(/\s+/g, '-')
    return `/menu/${normalizedCategory}/${normalizedName}.webp`
  }
  
  /**
   * Obtient les statistiques
   */
  getStats() {
    return {
      preloadedCount: this.preloadedImages.size,
      failedCount: this.failedImages.size,
      pendingMetrics: this.metricsQueue.length,
      averageLoadTime: this.calculateAverageLoadTime()
    }
  }
  
  private calculateAverageLoadTime(): number {
    const successMetrics = this.metricsQueue.filter(m => m.success)
    if (successMetrics.length === 0) return 0
    
    const totalTime = successMetrics.reduce((sum, m) => sum + m.loadTime, 0)
    return totalTime / successMetrics.length
  }
  
  /**
   * Nettoie les ressources
   */
  cleanup() {
    this.observer?.disconnect()
    this.flushMetrics()
    this.preloadedImages.clear()
    this.failedImages.clear()
    this.loadingImages.clear()
  }
}

export const imageOptimizer = ImageOptimizer.getInstance()
export default imageOptimizer