import { ComponentFixture } from '@angular/core/testing';
import { InputSignal } from '@angular/core';

/**
 * Type-safe helper for setting component inputs in tests
 * Provides better type safety than fixture.componentRef.setInput()
 */
export function setComponentInput<T, K extends keyof T>(
  fixture: ComponentFixture<T>,
  inputName: K,
  value: T[K] extends InputSignal<infer U> ? U : never
): void {
  fixture.componentRef.setInput(inputName as string, value);
}

/**
 * Type-safe helper for setting multiple component inputs at once
 */
export function setComponentInputs<T>(
  fixture: ComponentFixture<T>,
  inputs: Partial<{
    [K in keyof T]: T[K] extends InputSignal<infer U> ? U : never;
  }>
): void {
  Object.entries(inputs).forEach(([key, value]) => {
    fixture.componentRef.setInput(key, value);
  });
}