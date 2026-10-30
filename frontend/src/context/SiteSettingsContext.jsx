import { createContext, useContext, useEffect, useState } from "react";

import { getSiteSettings } from "../api/client.js";

// Used until (or if) the backend answers, so the site never looks empty.
export const DEFAULT_SETTINGS = {
  hero_image: "/images/hero.jpg",
  hero_image_alt: "Bright living room with warm timber furniture and natural light",
  studio_address: "Demo studio address, Bengaluru, Karnataka, India",
  phone: "+91 00000 00000",
  email: "hello@havenandhue.example",
  studio_hours: "Monday to Saturday, 10:00 - 18:00",
  instagram_url: "https://www.instagram.com/",
  pinterest_url: "https://www.pinterest.com/",
  linkedin_url: "https://www.linkedin.com/",
};

const SiteSettingsContext = createContext({ settings: DEFAULT_SETTINGS, loaded: false });

export function SiteSettingsProvider({ children }) {
  const [state, setState] = useState({ settings: DEFAULT_SETTINGS, loaded: false });

  useEffect(() => {
    const controller = new AbortController();

    getSiteSettings({ signal: controller.signal })
      .then((data) =>
        setState({
          settings: { ...DEFAULT_SETTINGS, ...data, hero_image: data.hero_image || DEFAULT_SETTINGS.hero_image },
          loaded: true,
        })
      )
      .catch((error) => {
        if (error.name === "AbortError") return;
        setState({ settings: DEFAULT_SETTINGS, loaded: true }); // keep the defaults
      });

    return () => controller.abort();
  }, []);

  return <SiteSettingsContext.Provider value={state}>{children}</SiteSettingsContext.Provider>;
}

// Returns { settings, loaded }
export const useSiteSettings = () => useContext(SiteSettingsContext);