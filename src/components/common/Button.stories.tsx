import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Common/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: "Botón Principal", variant: "default", size: "default" },
};
export const Secondary: Story = {
  args: { children: "Botón Secundario", variant: "secondary" },
};
export const Outline: Story = {
  args: { children: "Botón Outline", variant: "outline" },
};
export const Ghost: Story = {
  args: { children: "Botón Ghost", variant: "ghost" },
};
export const Destructive: Story = {
  args: { children: "Eliminar", variant: "destructive" },
};
export const Small: Story = {
  args: { children: "Pequeño", size: "sm" },
};
export const Large: Story = {
  args: { children: "Grande", size: "lg" },
};
export const Disabled: Story = {
  args: { children: "Deshabilitado", disabled: true },
};
export const Loading: Story = {
  args: { children: "Cargando...", loading: true },
};
