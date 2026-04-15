import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "../../contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const meta: Meta<typeof ThemeToggle> = {
  title: "Layout/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};

export const WithCustomClass: Story = {
  args: {
    className: "border-2 border-primary",
  },
};
