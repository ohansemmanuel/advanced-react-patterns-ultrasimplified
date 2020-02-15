import { useState, useLayoutEffect } from 'react'
import mojs from 'mo-js'

export const useAnimatedInfo = ({ bgEl, textEl }) => {
  const [animationTimeline, setAnimationTimeline] = useState(
    new mojs.Timeline()
  )

  useLayoutEffect(() => {
    if (!bgEl) {
      return
    }

    const shiftCurve = mojs.easing.path(
      'M0,100 C50,100 50,100 50,50 C50,0 50,0 100,0'
    )
    const scaleCurveBase = mojs.easing.path(
      'M0,100 C21.3776817,95.8051376 50,77.3262711 50,-700 C50,80.1708527 76.6222458,93.9449005 100,100'
    )
    const scaleCurve = p => {
      return 1 + scaleCurveBase(p)
    }
    const nScaleCurve = p => {
      return 1 - scaleCurveBase(p) / 10
    }

    const bgAnimate = new mojs.Html({
      el: bgEl,
      opacity: { 0: 1 },
      duration: 350
    })

    const movingRect = new mojs.Shape({
      parent: bgEl,
      shape: 'rect',
      fill: { '#F64040': '#F64040', curve: scaleCurve },
      radius: 10,
      rx: 3,
      x: { [-125]: 600, easing: shiftCurve },
      y: 50,
      scaleX: { 1: 1, curve: scaleCurve },
      scaleY: { 1: 1, curve: nScaleCurve },
      origin: { '0 50%': '100% 50%', easing: shiftCurve },
      duration: 1000,
      isShowEnd: false
    })

    const burst = new mojs.Burst({
      parent: bgEl,
      radius: { 0: 100 },
      x: { '50%': '90%' },
      count: 5,
      children: {
        shape: 'polygon',
        fill: { cyan: 'yellow' },
        radius: 20,
        angle: { 360: 0 },
        duration: 300
      }
    })

    const updatedAnimationTimeline = animationTimeline.add([
      bgAnimate,
      movingRect,
      burst
    ])

    setAnimationTimeline(updatedAnimationTimeline)
  }, [bgEl, animationTimeline])

  return animationTimeline
}
