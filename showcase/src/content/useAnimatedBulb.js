import { useState, useLayoutEffect } from 'react'
import mojs from 'mo-js'

export const useAnimatedBulb = ({ el }) => {
  const [animationTimeline, setAnimationTimeline] = useState(
    new mojs.Timeline()
  )

  useLayoutEffect(() => {
    if (!el) {
      return
    }

    const OPTS = {
      parent: el,
      fill: 'none',
      radius: 10,
      strokeWidth: { 20: 0 },
      scale: { 0: 1 },
      angle: { 'rand(-35, -70)': 0 },
      duration: 500,
      left: '50%',
      top: '50%',
      easing: 'cubic.out',
      className: 'no-pointer',
      isShowEnd: false
    }
    const circle1 = new mojs.Shape({
      ...OPTS,
      stroke: 'cyan'
    })

    const circle2 = new mojs.Shape({
      ...OPTS,
      radius: { 0: 15 },
      strokeWidth: { 15: 0 },
      stroke: 'magenta',
      delay: 'rand(75, 150)',
      isShowEnd: false
    })

    const animateBulb = new mojs.Html({
      el,
      isShowEnd: true,
      y: { 0: -15 },
      duration: 100
    }).then({
      y: { 20: 0 },
      delay: 100 / 2
    })

    const updatedAnimationTimeline = animationTimeline.add([
      circle1,
      circle2,
      animateBulb
    ])
    setAnimationTimeline(updatedAnimationTimeline)
  }, [el, animationTimeline])

  return animationTimeline
}
