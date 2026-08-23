import { TEMPLATES, type Template } from "./templates";

export const CLIENTS: Record<string, Template> = {
  "kareem-salma": {
    ...TEMPLATES.find(t => t.id === "layl")!,
    gallery: ["/kareem-salma/g1 (copy).jpg", "/kareem-salma/g2 (copy).jpg", "/kareem-salma/g3 (copy).jpg"],
    details: {
      firstName: "كريم",
      secondName: "سلمي",
      dateLine: "الجمعة · 30 أغسطس 2026 · 18:00",
      day: "30",
      month: "أغسطس",
      year: "2026",
      weekday: "الجمعة",
      time: "18:00",
      locationImage: "/kareem-salma/q.png",
      venueTitle: ["قاعة", "لؤلؤة عين شمس"],
      address: ["شارع العشرين", "القاهرة، عين شمس"],
      closing: "بكل الحب، كريم سلمي",
      countdownDate: new Date("2026-09-30T18:00:00"),
      namesEn: "Salma & Kareem",
      mapsUrl: "https://maps.app.goo.gl/gZVywkKe48C7medt5"
    },
  },
};