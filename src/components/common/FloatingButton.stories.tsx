import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MessageCircle, Phone } from "lucide-react";
import FloatingButton from "./FloatingButton";

const meta: Meta<typeof FloatingButton> = {
  title: "Common/FloatingButton",
  component: FloatingButton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof FloatingButton>;

export const WhatsApp: Story = {
  args: {
    position: "bottom-right",
    ariaLabel: "Contactar por WhatsApp",
    className: "bg-green-500 hover:bg-green-600 text-white",
    onClick: () => {},
  },
  render: (args) => (
    <FloatingButton {...args}>
      <MessageCircle className="w-6 h-6" />
    </FloatingButton>
  ),
};

export const Contact: Story = {
  args: {
    position: "bottom-right",
    ariaLabel: "Contactar",
    className: "bg-primary hover:bg-primary/90 mr-20",
    onClick: () => {},
  },
  render: (args) => (
    <FloatingButton {...args}>
      <Phone className="w-6 h-6" />
    </FloatingButton>
  ),
};

export const BottomLeft: Story = {
  args: {
    position: "bottom-left",
    ariaLabel: "Acción",
    onClick: () => {},
  },
  render: (args) => (
    <FloatingButton {...args}>
      <MessageCircle className="w-6 h-6" />
    </FloatingButton>
  ),
};
