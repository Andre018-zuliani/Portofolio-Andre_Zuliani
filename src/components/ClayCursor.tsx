import React, { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';

type CursorTint = 'default' | 'pink' | 'purple' | 'tosca';

const TINT_STYLES: Record<
  CursorTint,
  { background: string; boxShadow: string; dotColor: string }
> = {
  default: {
    background:
      'radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.88) 0%, rgba(167, 139, 250, 0.42) 58%, rgba(109, 40, 217, 0.34) 100%)',
    boxShadow:
      '0 10px 24px -4px rgba(109, 40, 217, 0.36), inset 0 3px 6px rgba(255, 255, 255, 0.9), inset 0 -4px 8px rgba(91, 33, 182, 0.28)',
    dotColor: '#4C1D95',
  },
  pink: {
    background:
      'radial-gradient(circle at 32% 28%, rgba(255, 240, 247, 0.9) 0%, rgba(251, 75, 147, 0.46) 60%, rgba(219, 39, 119, 0.38) 100%)',
    boxShadow:
      '0 12px 28px -4px rgba(225, 39, 120, 0.48), inset 0 4px 7px rgba(255, 255, 255, 0.92), inset 0 -4px 9px rgba(157, 23, 77, 0.32)',
    dotColor: '#FFFFFF',
  },
  purple: {
    background:
      'radial-gradient(circle at 32% 28%, rgba(245, 243, 255, 0.9) 0%, rgba(147, 83, 255, 0.46) 60%, rgba(109, 40, 217, 0.38) 100%)',
    boxShadow:
      '0 12px 28px -4px rgba(109, 40, 217, 0.50), inset 0 4px 7px rgba(255, 255, 255, 0.92), inset 0 -4px 9px rgba(76, 29, 149, 0.34)',
    dotColor: '#FFFFFF',
  },
  tosca: {
    background:
      'radial-gradient(circle at 32% 28%, rgba(240, 253, 250, 0.9) 0%, rgba(22, 196, 179, 0.46) 60%, rgba(11, 132, 120, 0.38) 100%)',
    boxShadow:
      '0 12px 28px -4px rgba(13, 148, 136, 0.48), inset 0 4px 7px rgba(255, 255, 255, 0.92), inset 0 -4px 9px rgba(17, 94, 89, 0.32)',
    dotColor: '#FFFFFF',
  },
};

export const ClayCursor: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverMode, setHoverMode] = useState<'idle' | 'button' | 'card'>('idle');
  const [isPressed, setIsPressed] = useState(false);
  const [tint, setTint] = useState<CursorTint>('default');

  // Raw pointer coordinates for crisp inner clay bead
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Magnetic target coordinates for the trailing soft clay orb
  const targetOrbX = useMotionValue(-100);
  const targetOrbY = useMotionValue(-100);

  // Fast precision spring for inner clay bead
  const dotX = useSpring(mouseX, { stiffness: 780, damping: 36, mass: 0.2 });
  const dotY = useSpring(mouseY, { stiffness: 780, damping: 36, mass: 0.2 });

  // Slightly delayed squishy spring for outer magnetic clay blob
  const orbX = useSpring(targetOrbX, {
    stiffness: 190,
    damping: 20,
    mass: 0.68,
  });
  const orbY = useSpring(targetOrbY, {
    stiffness: 190,
    damping: 20,
    mass: 0.68,
  });

  // Subtle organic clay stretch based on horizontal/vertical velocity
  const velX = useVelocity(orbX);
  const velY = useVelocity(orbY);

  const stretchX = useTransform([velX, velY], ([vx, vy]: number[]) => {
    const speed = Math.min(Math.hypot(vx || 0, vy || 0), 1400);
    return 1 + (speed / 1400) * 0.16;
  });

  const stretchY = useTransform([velX, velY], ([vx, vy]: number[]) => {
    const speed = Math.min(Math.hypot(vx || 0, vy || 0), 1400);
    return 1 - (speed / 1400) * 0.10;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) {
      setIsFinePointer(false);
      document.body.removeAttribute('data-clay-cursor');
      return;
    }

    const mediaQuery = window.matchMedia('(pointer: fine)');
    const updatePointerCapability = () => {
      const enabled = mediaQuery.matches;
      setIsFinePointer(enabled);
      if (enabled) {
        document.body.setAttribute('data-clay-cursor', 'active');
      } else {
        document.body.removeAttribute('data-clay-cursor');
      }
    };

    updatePointerCapability();
    mediaQuery.addEventListener('change', updatePointerCapability);

    return () => {
      mediaQuery.removeEventListener('change', updatePointerCapability);
      document.body.removeAttribute('data-clay-cursor');
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isFinePointer || prefersReducedMotion) return;

    const resolveTint = (el: Element | null): CursorTint => {
      if (!el) return 'default';
      if (el.closest('.clay-card-pink')) return 'pink';
      if (el.closest('.clay-card-purple')) return 'purple';
      if (el.closest('.clay-card-tosca')) return 'tosca';
      return 'default';
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);

      const target = e.target as HTMLElement | null;

      // Hide custom cursor over embedded PDF iframes so native PDF controls work seamlessly
      if (target?.tagName === 'IFRAME') {
        setIsVisible(false);
        return;
      }

      if (!isVisible) {
        setIsVisible(true);
      }

      const interactiveEl = target?.closest(
        'button, a, [role="button"], [role="tab"], input, textarea'
      ) as HTMLElement | null;

      setTint(resolveTint(target));

      if (interactiveEl) {
        const rect = interactiveEl.getBoundingClientRect();
        const isCompactControl = rect.width <= 300 && rect.height <= 96;

        if (isCompactControl) {
          // Magnetic pull: attract trailing clay orb 26% toward the button/link center
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          targetOrbX.set(clientX + (centerX - clientX) * 0.26);
          targetOrbY.set(clientY + (centerY - clientY) * 0.26);
          setHoverMode('button');
        } else {
          // Large toy-box card: gentle magnetic pull (8%) + larger plush clay expansion
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          targetOrbX.set(clientX + (centerX - clientX) * 0.08);
          targetOrbY.set(clientY + (centerY - clientY) * 0.08);
          setHoverMode('card');
        }
      } else {
        targetOrbX.set(clientX);
        targetOrbY.set(clientY);
        setHoverMode('idle');
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener(
      'mouseleave',
      handleMouseLeaveWindow
    );
    document.documentElement.addEventListener(
      'mouseenter',
      handleMouseEnterWindow
    );

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener(
        'mouseleave',
        handleMouseLeaveWindow
      );
      document.documentElement.removeEventListener(
        'mouseenter',
        handleMouseEnterWindow
      );
    };
  }, [
    isFinePointer,
    isVisible,
    mouseX,
    mouseY,
    prefersReducedMotion,
    targetOrbX,
    targetOrbY,
  ]);

  if (!isFinePointer || prefersReducedMotion) {
    return null;
  }

  const activeStyle = TINT_STYLES[tint];

  const targetOrbScale = isPressed
    ? hoverMode === 'idle'
      ? 0.78
      : 1.32
    : hoverMode === 'card'
    ? 2.15
    : hoverMode === 'button'
    ? 1.75
    : 1;

  const targetDotScale = isPressed
    ? 0.75
    : hoverMode !== 'idle'
    ? 0.65
    : 1;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
    >
      {/* Trailing Magnetic 3D Soft Clay Orb */}
      <motion.div
        style={{
          x: orbX,
          y: orbY,
          scaleX: stretchX,
          scaleY: stretchY,
          translateX: '-50%',
          translateY: '-50%',
          background: activeStyle.background,
          boxShadow: activeStyle.boxShadow,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: targetOrbScale,
          borderRadius:
            hoverMode === 'button'
              ? '44% 56% 52% 48% / 48% 45% 55% 52%'
              : '50%',
        }}
        transition={{
          scale: { type: 'spring', stiffness: 320, damping: 20, mass: 0.55 },
          opacity: { duration: 0.16 },
          borderRadius: { duration: 0.25 },
        }}
        className="fixed top-0 left-0 w-9 h-9 backdrop-blur-[1.5px] will-change-transform"
      />

      {/* Precision Inner Clay Bead */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: activeStyle.dotColor,
          boxShadow:
            '0 2px 6px rgba(76, 29, 149, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.85)',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: targetDotScale,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 520, damping: 28 },
          opacity: { duration: 0.14 },
        }}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full will-change-transform"
      />
    </div>
  );
};
