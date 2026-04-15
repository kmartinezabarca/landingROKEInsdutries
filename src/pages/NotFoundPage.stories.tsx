import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

const meta: Meta<typeof NotFoundPage> = {
  title: "Pages/NotFoundPage",
  component: NotFoundPage,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof NotFoundPage>;

export const Default: Story = {};
