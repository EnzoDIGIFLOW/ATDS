'use client'

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface ZoomPortalProps {
  isOpen: boolean
  imageUrl: string
  productName: string
  onClose: () => void
}

export default function ZoomPortal({ isOpen, imageUrl, productName, onClose }: ZoomPortalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay avec flou d'arrière-plan */}
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />
          
          {/* Image zoomée centrale */}
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] pointer-events-none"
            initial={{ 
              opacity: 0, 
              scale: 0.9
            }}
            animate={{ 
              opacity: 1, 
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.9
            }}
            transition={{ 
              duration: 0.15,
              ease: "easeOut"
            }}
          >
            <div className="relative">
              {/* Ombre douce */}
              <div className="absolute -inset-2 bg-black/20 rounded-2xl blur-2xl" />
              
              {/* Conteneur principal */}
              <div className="relative bg-white rounded-2xl shadow-2xl p-3 overflow-hidden">
                {/* Image zoomée */}
                <img
                  src={imageUrl}
                  alt={productName}
                  width={280}
                  height={280}
                  className="object-cover rounded-xl block"
                />
                
                {/* Badge du nom simple */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-2 rounded-lg shadow-lg">
                    <p className="text-sm font-semibold text-center truncate">{productName}</p>
                    <p className="text-[10px] text-center text-gray-500 mt-0.5">Cliquez pour fermer</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}