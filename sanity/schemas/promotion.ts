import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'promotion',
  title: 'Promotion',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Promotion Content',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
    }),
    defineField({
      name: 'link',
      title: 'Link URL',
      type: 'url',
      description: 'Optional link for the promotion',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Warning', value: 'warning' },
        ],
      },
      initialValue: 'primary',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'content',
      active: 'active',
    },
    prepare(selection) {
      const { title, subtitle, active } = selection;
      return {
        title,
        subtitle: `${active ? '🟢 Active' : '🔴 Inactive'} - ${subtitle}`,
      };
    },
  },
});