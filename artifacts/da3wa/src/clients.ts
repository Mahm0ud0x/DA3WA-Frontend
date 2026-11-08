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

  "mahmoud-reem": {
    ...TEMPLATES.find(t => t.id === "layl")!,
    gallery: [],
    details: {
      firstName: "محمود",
      secondName: "ريم",
      dateLine: "الجمعة · 27 نوفمبر 2026 · 18:00",
      day: "27",
      month: "نوفمبر",
      year: "2026",
      weekday: "الجمعة",
      time: "18:00",
      locationImage: "/mahmoud-reem.jpg",
      closing: "بكل الحب، محمود ريم",
      countdownDate: new Date("2026-11-27T18:00:00"),
      namesEn: "Reem & Mahmoud",
      mapsUrl: "https://maps.app.goo.gl/qfHzdmivspqUhNSU9?g_st=aw",
      eventType: "engagement",
      hideTimeline: true
    },
  },
}