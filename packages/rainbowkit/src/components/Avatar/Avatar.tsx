import React, { useMemo } from 'react';
import { Box } from '../Box/Box';
import { SpinnerIcon } from '../Icons/Spinner';
import { emojiAvatarForAddress } from './emojiAvatarForAddress';

interface AvatarProps {
  size: number;
  imageUrl?: string | null;
  address: string;
  loading?: boolean;
}

export function Avatar({ address, imageUrl, loading, size }: AvatarProps) {
  const { color: backgroundColor, emoji } = useMemo(
    () => emojiAvatarForAddress(address),
    [address]
  );

  return (
    <Box
      aria-hidden
      borderRadius="full"
      overflow="hidden"
      position="relative"
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
      userSelect="none"
    >
      <Box
        alignItems="center"
        borderRadius="full"
        display="flex"
        justifyContent="center"
        overflow="hidden"
        position="absolute"
        style={{
          ...(!imageUrl && { backgroundColor }),
          fontSize: `${Math.round(size * 0.55)}px`,
          height: `${size}px`,
          transform: loading ? 'scale(0.72)' : undefined,
          transition: '.25s ease',
          transitionDelay: loading ? undefined : '.1s',
          width: `${size}px`,
          willChange: 'transform',
        }}
        userSelect="none"
      >
        {imageUrl ? (
          <Box
            backgroundSize="cover"
            borderRadius="full"
            height="full"
            position="absolute"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: 'center',
            }}
            width="full"
          />
        ) : (
          emoji
        )}
      </Box>
      {typeof loading === 'boolean' && (
        <Box
          color="accentColor"
          display="flex"
          height="full"
          position="absolute"
          style={{
            opacity: loading ? 1 : 0,
            transition: loading ? '0.6s ease' : '0.2s ease',
            transitionDelay: loading ? '.05s' : undefined,
          }}
          width="full"
        >
          <SpinnerIcon height="100%" width="100%" />
        </Box>
      )}
    </Box>
  );
}
