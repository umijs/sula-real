
// 抽屉模块框配置
export function filterConfig(configParams) {
  const { mode, id, format } = configParams || {};
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
          showTime: { format: 'HH:mm:ss' }
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
  if (mode === 'audit' || mode === 'auditView' || mode === 'grayscaleEdit') {
    let titleFinally = format({ id: 'audit' });
    let modeFinally = 'edit';
    let submitButtonText = format({ id: 'submitBtn.text' });
    if (mode === 'auditView') {
      modeFinally = 'view';
    } else if (mode === 'grayscaleEdit') {
      titleFinally = format({ id: 'edit' })
    } else {
      submitButtonText = format({ id: 'submitAuditBtn.text' })
    }
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
    fields.splice(fields.length - 1, 0, fieldsTem);
    return {
      title: titleFinally,
      mode: modeFinally,
      fields,
      remoteValues: {
        url: '/api/release/detail.json',
        params: { id },
        method: 'post',
      },
      submitButtonProps: {
        children: submitButtonText,
      },
      submit: {
        url: '/api/release/grayscalePublish.json',
        method: 'post',
        params: {
          id,
          action: 'G',
        },
        converter: ({ data }) => {
          return { ...data, action: 'G' };
        },
      },
    };
  }
  if (mode === 'edit') {
    return {
      title: format({ id: 'edit' }),
      fields,
      mode,
      remoteValues: {
        url: '/api/release/detail.json',
        params: { id },
        method: 'post',
      },
      submit: {
        url: '/api/release/edit.json',
        method: 'post',
        params: { id },
        successMessage: format({ id: 'edit.success' })
      },
    };
  }
  if (mode === 'view') {
    return {
      title: format({ id: 'view' }),
      mode: 'view',
      fields,
      remoteValues: {
        url: '/api/release/detail.json',
        params: { id },
        method: 'post',
      },
    };
  }
  return {
    title: format({ id: 'create' }),
    type: 'drawerform',
    fields,
    submit: {
      url: '/api/release/create.json',
      method: 'post',
      successMessage: format({ id: 'create.success' })
    },
  };
}
