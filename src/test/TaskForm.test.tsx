import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskForm } from '../components/TaskForm';

describe('TaskForm Component', () => {
  it('debe renderizar los inputs de título y descripción correctamente', () => {
    const mockOnTaskAdded = vi.fn();
    render(<TaskForm onTaskAdded={mockOnTaskAdded} />);

    const titleInput = screen.getByPlaceholderText(/título de la tarea/i);
    const descriptionInput = screen.getByPlaceholderText(/descripción/i);
    const submitButton = screen.getByRole('button', { name: /guardar tarea/i });

    expect(titleInput).toBeDefined();
    expect(descriptionInput).toBeDefined();
    expect(submitButton).toBeDefined();
  });
});
