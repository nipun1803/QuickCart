import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';

describe('Basic Setup Test', () => {
    it('should pass a sanity check', () => {
        expect(1 + 1).toBe(2);
    });

    it('should render a simple element', () => {
        render(<div data-testid="test">Hello World</div>);
        expect(screen.getByTestId('test')).toHaveTextContent('Hello World');
    });
});
