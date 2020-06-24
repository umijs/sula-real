export const fieldsConfig = (type, format) => {
  const fields = [
    {
      name: 'iterateName',
      label: format({ id: 'iterateName.title' }),
      field: {
        type: 'input',
        props: {
          placeholder: format({ id: 'iterateName.placeholder' }),
        },
      },
      rules: [
        { required: true, message: format({ id: 'iterateName.placeholder' }) },
      ],
    },
    {
      name: 'principal',
      label: format({ id: 'principal.title' }),
      initialSource: [
        {
          value: 'limengqi',
          text: '李梦琪',
        },
        {
          value: 'zhangbaili',
          text: '张白丽',
        },
        {
          value: 'xujiajia',
          text: '徐佳佳',
        },
      ],
      field: {
        type: 'select',
        props: {
          placeholder: format({ id: 'principal.placeholder' }),
        },
      },
      rules: [
        { required: true, message: format({ id: 'principal.placeholder' }) },
      ],
    },
    {
      name: 'estimatetime',
      label: format({ id: 'estimatetime.name' }),
      field: {
        type: 'datepicker',
        props: {
          placeholder: format({ id: 'estimatetime.placeholder' }),
          style: { width: '100%' },
          valueFormat: 'utc',
          format: 'YYYY-MM-DD HH:mm:ss',
          showTime: { format: 'HH:mm:ss' },
        },
      },
      rules: [
        { required: true, message: format({ id: 'estimatetime.placeholder' }) },
      ],
    },
    {
      name: 'versionUpdate',
      label: format({ id: 'versionUpdate.name' }),
      initialSource: [
        {
          value: 'manual',
          text: format({ id: 'manual' }),
        },
        {
          value: 'automatic',
          text: format({ id: 'automatic' }),
        },
      ],
      field: {
        type: 'radiogroup',
      },
      rules: [
        { required: true, message: format({ id: 'versionUpdate.rules' }) },
      ],
    },
    {
      name: 'operator',
      label: format({ id: 'operator.title' }),
      field: {
        type: 'input',
        props: {
          placeholder: format({ id: 'operator.placeholder' }),
        },
      },
      rules: [{ required: true, message: '请输入' }],
    },
    {
      name: 'direction',
      label: format({ id: 'direction.title' }),
      field: {
        type: 'textarea',
        props: {
          placeholder: format({ id: 'direction.placeholder' }),
        },
      },
    },
  ];

  const fieldsTem = {
    name: 'grayScale',
    label: format({ id: 'proportionGrayscale.name' }),
    field: {
      type: 'inputnumber',
      props: {
        placeholder: format({ id: 'proportionGrayscale.placeholder' }),
        style: { width: '100%' },
        formatter: value => value && `${value}%`,
        min: 10,
        max: 100,
      },
    },
    rules: [
      {
        required: true,
        message: format({ id: 'proportionGrayscale.placeholder' }),
      },
    ],
  };

  // 灰度编辑、查看 添加灰度比例项
  if (type === 'grayscale') {
    fields.splice(fields.length - 1, 0, fieldsTem);
  }
  return fields;
};
