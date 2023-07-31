
export default {
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    {
      name: 'courseName',
      title: 'Course Name',
      type: 'string',
    },
    {
      type: "slug",
      name: "slug",
      title: "Slug"
    },
    {
      name: 'courseType',
      title: 'Course Type',
      type: 'string',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Elective Course', value: 'elective' },
          { title: 'Core Elective', value: 'core_elective' },
          { title: 'Core Course', value: 'core' },
          { title: 'Club Course', value: 'club' },
        ],
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'ELA', value: 'ela' },
          { title: 'CLA', value: 'cla' },
          { title: 'Math', value: 'math' },
          { title: 'Physics', value: 'physics' },
          { title: 'Chemistry', value: 'chemistry' },
          { title: 'Biology', value: 'biology' },
          { title: 'Global Studies', value: 'wcc' },
          { title: "Writing Lab", value: 'WL'},
          { title: 'Fine Arts', value: 'fineArts' },
          { title: "Colledge Conselling Center", value: 'cpc' },
          { title: 'Student Lead Courses', value: 'slc' },
          { title: "IT", value: 'it' },
          { title: "IRP", value: 'irp' },
        ]
      }
    },
    {
      name: 'HL',
      title: 'HL Course',
      type: 'boolean',
    },
    {
      name: 'grade',
      title: 'Grade',
      type: 'array',
      of: [{ type: 'number' }],
      options: {
        list: [
          { title: '10', value: 10 },
          { title: '11', value: 11 },
          { title: '12', value: 12 },
        ],
      },
    },
    {
      name: 'semester',
      title: 'Semester',
      type: 'array',
      of: [{ type: 'number' }],
      options: {
        list: [
          { title: '1', value: 1 },
          { title: '2', value: 2 },
        ],
      },
    },
    {
      name: 'preRequisite',
      title: 'Pre-requisite',
      type: 'string',
    },
    {
      name: 'instructor',
      title: 'Instructor',
      type: 'string',
    },
    {
      name: 'instructor2',
      title: 'Instructor 2',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'objectives',
      title: 'Objectives',
      type: 'text',
    },
    {
      name: 'assessment',
      title: 'Assessment',
      type: 'text',
    },
    {
      name: 'apHelpStatus',
      title: 'AP Help Status',
      type: 'string',
    },
  ],
};
