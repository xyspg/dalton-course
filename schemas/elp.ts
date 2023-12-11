//@ts-nocheck
import {defineType, defineField} from 'sanity'

const supportedLanguages = [
    {id: 'zh', title: 'Chinese', isDefault: true},
    {id: 'en', title: 'English'}
    ]

export const baseLanguage = supportedLanguages.find(l => l.isDefault)

export const localeString = defineType({
    title: 'Localized string',
    name: 'localeString',
    type: 'object',
    // Fieldsets can be used to group object fields.
    // Here we omit a fieldset for the "default language",
    // making it stand out as the main field.
    fieldsets: [
        {
            title: 'Translations',
            name: 'translations',
            options: { collapsible: true }
        }
    ],
    // Dynamically define one field per language
    fields: supportedLanguages.map(lang => ({
        title: lang.title,
        name: lang.id,
        type: 'string',
        fieldset: lang.isDefault ? null : 'translations'
    }))
})
export default {
    name: "ELP",
    title: "ELP",
    type: "document",
    fields: [
        {
            name: "programNameZH",
            title: "Program Name (Chinese)",
            type: "string"
        },
        {
            name: "programNameEN",
            title: "Program Name",
            type: "string"
        },
        {
            type: "slug",
            name: "slug",
            title: "Slug",
            options: {
                source: "programNameEN",
                maxLength: 200, // will be ignored if slugify is set
                slugify: (input: string) =>
                    input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
            },
        },
        {
            name: "category",
            title: "Category",
            type: "string",
            of: [{ type: "string" }],
            options: {
                list: [
                    // 科学研究 艺术传媒 社科经济 生态探索
                    { title: "科学研究", value: "science" },
                    { title: "艺术传媒", value: "art" },
                    { title: "社科经济", value: "social" },
                    { title: "生态探索", value: "ecology" },
                ]
            }
        },
        {
            name: "categoryEN",
            title: "Category (English)",
            type: "string",
            of: [{ type: "string" }],
            options: {
                list: [
                    // Scientific Research/ Arts and Media/ Social Sciences and Economics/ Ecological Exploration
                    { title: "Scientific Research", value: "science" },
                    { title: "Arts and Media", value: "art" },
                    { title: "Social Sciences and Economics", value: "social" },
                    { title: "Ecological Exploration", value: "ecology" },
                ]
            }
        },
        {
            name: "duration",
            title: "Duration",
            type: "number",
        },
        {
            name: "accommodation",
            title: "Accommodation",
            type: "number",
        },
        {
            name: "locationZH",
            title: "Location (Chinese)",
            type: "string"
        },
        {
            name: "locationEN",
            title: "Location",
            type: "string"
        },
        {
            name: "lowerCost",
            title: "Lower Cost",
            type: "number",
        },
        {
            name: "upperCost",
            title: "Upper Cost",
            type: "number",
        },
        {
            name: "heroImage",
            title: "Hero Image",
            type: "image",
        },
        {
            name: "PDF",
            title: "PDF",
            type: "file",
        },
        {
            name: "PDFEN",
            title: "PDF (English)",
            type: "file",
        }

    ]

}