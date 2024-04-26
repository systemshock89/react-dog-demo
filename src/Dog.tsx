// Dog.tsx
import { forwardRef } from 'react';

export const Dog =forwardRef<HTMLDivElement>((_, ref) => <div ref={ref}>🐶</div>);
