import mixpanel from "mixpanel-browser";
mixpanel.init(process.env.MIXPANEL_KEY || "");

const production = process.env.NODE_ENV === "production";

const actions = {
  track: (name: MIX_TRACK, props: Record<string, unknown>) => {
    if (!production) mixpanel.track(name, props);
  },
};

export const TRACK = {
  HOME: "HOME",
  READ_POST: "READ_POST",
} as const;
type MIX_TRACK = typeof TRACK[keyof typeof TRACK];
export const Mixpanel = actions;
