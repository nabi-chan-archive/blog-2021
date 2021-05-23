import mixpanel from "mixpanel-browser";
mixpanel.init(process.env.MIXPANEL_KEY || "b0dca1d782df743cbd77f4c87ce8e107");

const actions = {
  track: (name: MIX_TRACK, props: Record<string, unknown>) => {
    mixpanel.track(name, props);
  },
};

export const TRACK = {
  HOME: "HOME",
  READ_POST: "READ_POST",
} as const;
type MIX_TRACK = typeof TRACK[keyof typeof TRACK];
export const Mixpanel = actions;
