import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "quickLinks",
      title: "Quick Links",
      type: "array",
      of: [
        defineField({
          name: "quickLinkItem",
          title: "Quick Link Item",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 4,
            }),
            defineField({
              name: "linkLabel",
              title: "Link Label",
              type: "string",
            }),
            defineField({
              name: "linkUrl",
              title: "Link URL",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "aboutTitle",
      title: "About Title",
      type: "string",
    }),
    defineField({
      name: "aboutBody",
      title: "About Body",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "programCards",
      title: "Program Cards",
      type: "array",
      of: [{ type: "reference", to: [{ type: "program" }] }],
    }),
    defineField({
      name: "faqItems",
      title: "FAQ Items",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faqItem" }] }],
    }),
  ],
  preview: {
    select: {
      title: "heroTitle",
    },
    prepare({ title }) {
      return {
        title: title || "Home Page",
      };
    },
  },
});
