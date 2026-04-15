import type { Meta, StoryObj } from "@storybook/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

const meta: Meta<typeof LanguageSwitcher> = {
  title: "Common/LanguageSwitcher",
  component: LanguageSwitcher,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LanguageSwitcher>;

export const Default: Story = {};

export const WithCustomClass: Story = {
  args: {
    className: "p-2 bg-muted rounded-md",
  },
};
