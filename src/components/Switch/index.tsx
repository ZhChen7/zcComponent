import * as React from "react";

import classNames from 'classnames'

import './index.scss';

/*
Usage: <Switch id={id} checked={value} onChange={checked => setValue(checked)}} />
*/

interface SwitchPropTypes {
  id          : string
  checked     : boolean
  onChange    : ()=>void
  name        ?: string
  className   ?: string
  disabled    ?: boolean
  // optionLabels?: [string, string]
};


export const Switch = (props:SwitchPropTypes):JSX.Element => {
  const { id, checked, onChange, className, name, disabled = false } = props
  return (
    <div className={classNames({
      'mi-switch': true,
    }, className)}>
      <input
        type='checkbox'
        name={name}
        className='mi-switch-checkbox'
        id={id}
        checked={checked}
        // defaultChecked={checked}
        onChange={onChange}
        disabled={disabled}
      />

      <label className='mi-switch-label'
        htmlFor={id}
      >
        <span
          className={
            classNames({
              'mi-switch-disabled': disabled,
              'mi-switch-inner'   : true,
              'mi-switch-checked' : checked
            })
          }
        >
          <i
            className={classNames({
              'mi-switch-block'   : true,
              'mi-switch-disabled': disabled,
            })
            }
          />
        </span>

      </label>
    </div>
  );
}
