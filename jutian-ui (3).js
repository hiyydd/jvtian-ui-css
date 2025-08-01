(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.JutianUI = {}));
})(this, (function (exports) { 'use strict';

    /**
     * 巨天UI - 按钮组件
     * 支持多种类型、大小、状态的按钮
     */
    class JTButton extends HTMLElement {
        constructor() {
            super();
            this.props = {};
            this.attachShadow({ mode: 'open' });
            this.button = document.createElement('button');
            this.render();
            this.bindEvents();
        }
        static get observedAttributes() {
            return ['type', 'size', 'plain', 'round', 'circle', 'disabled', 'loading', 'icon', 'native-type'];
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                this.updateProps();
                this.render();
            }
        }
        connectedCallback() {
            this.updateProps();
            this.render();
        }
        updateProps() {
            this.props = {
                type: this.getAttribute('type') || 'default',
                size: this.getAttribute('size') || 'medium',
                plain: this.hasAttribute('plain'),
                round: this.hasAttribute('round'),
                circle: this.hasAttribute('circle'),
                disabled: this.hasAttribute('disabled'),
                loading: this.hasAttribute('loading'),
                icon: this.getAttribute('icon') || '',
                nativeType: this.getAttribute('native-type') || 'button'
            };
        }
        render() {
            const { type, size, plain, round, circle, disabled, loading, icon, nativeType } = this.props;
            // 构建CSS类名
            const classes = [
                'jt-button',
                `jt-button--${type}`,
                `jt-button--${size}`,
                plain ? 'jt-button--plain' : '',
                round ? 'jt-button--round' : '',
                circle ? 'jt-button--circle' : '',
                disabled ? 'is-disabled' : '',
                loading ? 'is-loading' : ''
            ].filter(Boolean).join(' ');
            this.button.className = classes;
            this.button.type = nativeType;
            this.button.disabled = disabled || loading;
            // 构建按钮内容
            let content = '';
            if (loading) {
                content += '<i class="jt-icon-loading"></i>';
            }
            else if (icon) {
                content += `<i class="${icon}"></i>`;
            }
            content += '<slot></slot>';
            this.button.innerHTML = content;
            // 添加样式
            const style = document.createElement('style');
            style.textContent = this.getStyles();
            this.shadowRoot.innerHTML = '';
            this.shadowRoot.appendChild(style);
            this.shadowRoot.appendChild(this.button);
        }
        bindEvents() {
            this.button.addEventListener('click', (e) => {
                if (this.props.disabled || this.props.loading) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                // 触发自定义事件
                this.dispatchEvent(new CustomEvent('click', {
                    detail: e,
                    bubbles: true,
                    cancelable: true
                }));
            });
        }
        getStyles() {
            return `
      :host {
        display: inline-block;
      }

      .jt-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        height: var(--jt-component-size-default);
        white-space: nowrap;
        cursor: pointer;
        background: var(--jt-fill-color-blank);
        border: 1px solid var(--jt-border-color);
        color: var(--jt-color-text-regular);
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        font-weight: var(--jt-font-weight-primary);
        font-size: var(--jt-font-size-base);
        font-family: inherit;
        border-radius: var(--jt-border-radius-base);
        padding: 8px 15px;
        transition: var(--jt-transition-all);
        user-select: none;
        vertical-align: middle;
        -webkit-appearance: none;
      }

      .jt-button:hover,
      .jt-button:focus {
        color: var(--jt-color-primary);
        border-color: var(--jt-color-primary-light-5);
        background-color: var(--jt-color-primary-light-9);
        outline: none;
      }

      .jt-button:active {
        color: var(--jt-color-primary-dark-2);
        border-color: var(--jt-color-primary-dark-2);
        outline: none;
      }

      /* 按钮类型 */
      .jt-button--primary {
        color: #fff;
        background-color: var(--jt-color-primary);
        border-color: var(--jt-color-primary);
      }

      .jt-button--primary:hover,
      .jt-button--primary:focus {
        background: var(--jt-color-primary-light-3);
        border-color: var(--jt-color-primary-light-3);
        color: #fff;
      }

      .jt-button--success {
        color: #fff;
        background-color: var(--jt-color-success);
        border-color: var(--jt-color-success);
      }

      .jt-button--warning {
        color: #fff;
        background-color: var(--jt-color-warning);
        border-color: var(--jt-color-warning);
      }

      .jt-button--danger {
        color: #fff;
        background-color: var(--jt-color-danger);
        border-color: var(--jt-color-danger);
      }

      .jt-button--info {
        color: #fff;
        background-color: var(--jt-color-info);
        border-color: var(--jt-color-info);
      }

      /* 按钮大小 */
      .jt-button--large {
        height: var(--jt-component-size-large);
        padding: 12px 19px;
        font-size: var(--jt-font-size-large);
        border-radius: var(--jt-border-radius-base);
      }

      .jt-button--small {
        height: var(--jt-component-size-small);
        padding: 5px 11px;
        font-size: var(--jt-font-size-small);
        border-radius: calc(var(--jt-border-radius-base) - 1px);
      }

      .jt-button--mini {
        height: 20px;
        padding: 2px 7px;
        font-size: var(--jt-font-size-extra-small);
        border-radius: calc(var(--jt-border-radius-base) - 1px);
      }

      /* 朴素按钮 */
      .jt-button--plain {
        background: var(--jt-fill-color-blank);
        border-color: var(--jt-border-color-lighter);
        color: var(--jt-color-text-regular);
      }

      .jt-button--primary.jt-button--plain {
        color: var(--jt-color-primary);
        background: var(--jt-color-primary-light-9);
        border-color: var(--jt-color-primary-light-5);
      }

      /* 圆角按钮 */
      .jt-button--round {
        border-radius: var(--jt-border-radius-round);
      }

      /* 圆形按钮 */
      .jt-button--circle {
        border-radius: 50%;
        padding: 8px;
        width: var(--jt-component-size-default);
      }

      /* 禁用状态 */
      .jt-button.is-disabled,
      .jt-button.is-disabled:hover,
      .jt-button.is-disabled:focus {
        color: var(--jt-color-text-disabled);
        cursor: not-allowed;
        background-image: none;
        background-color: var(--jt-fill-color-blank);
        border-color: var(--jt-border-color-light);
      }

      /* 加载状态 */
      .jt-button.is-loading {
        position: relative;
        pointer-events: none;
      }

      .jt-icon-loading {
        animation: rotating 2s linear infinite;
        margin-right: 5px;
      }

      .jt-icon-loading:before {
        content: "⟳";
      }

      @keyframes rotating {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      /* 图标间距 */
      .jt-button i + slot:not(:empty) {
        margin-left: 5px;
      }
    `;
        }
        // 静态方法用于注册组件
        static register() {
            if (!customElements.get('jt-button')) {
                customElements.define('jt-button', JTButton);
            }
        }
    }
    // 自动注册组件
    JTButton.register();

    /**
     * 巨天UI - 输入框组件
     * 支持多种类型、验证、清除等功能
     */
    class JTInput extends HTMLElement {
        constructor() {
            super();
            this.props = {};
            this._value = '';
            this.attachShadow({ mode: 'open' });
            this.wrapper = document.createElement('div');
            this.input = document.createElement('input');
            this.render();
            this.bindEvents();
        }
        static get observedAttributes() {
            return ['type', 'value', 'placeholder', 'disabled', 'readonly', 'clearable', 'show-password', 'prefix-icon', 'suffix-icon', 'maxlength', 'show-word-limit', 'size'];
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                this.updateProps();
                this.render();
            }
        }
        connectedCallback() {
            this.updateProps();
            this.render();
        }
        get value() {
            return this._value;
        }
        set value(val) {
            this._value = val;
            this.input.value = val;
            this.setAttribute('value', val);
        }
        updateProps() {
            this.props = {
                type: this.getAttribute('type') || 'text',
                value: this.getAttribute('value') || '',
                placeholder: this.getAttribute('placeholder') || '',
                disabled: this.hasAttribute('disabled'),
                readonly: this.hasAttribute('readonly'),
                clearable: this.hasAttribute('clearable'),
                showPassword: this.hasAttribute('show-password'),
                prefixIcon: this.getAttribute('prefix-icon') || '',
                suffixIcon: this.getAttribute('suffix-icon') || '',
                maxlength: parseInt(this.getAttribute('maxlength') || '0') || undefined,
                showWordLimit: this.hasAttribute('show-word-limit'),
                size: this.getAttribute('size') || 'medium'
            };
            this._value = this.props.value || '';
        }
        render() {
            const { type, value, placeholder, disabled, readonly, clearable, showPassword, prefixIcon, suffixIcon, maxlength, showWordLimit, size } = this.props;
            // 构建CSS类名
            const classes = [
                'jt-input',
                `jt-input--${size}`,
                disabled ? 'is-disabled' : '',
                readonly ? 'is-readonly' : '',
                prefixIcon ? 'jt-input--prefix' : '',
                suffixIcon || clearable || showPassword ? 'jt-input--suffix' : ''
            ].filter(Boolean).join(' ');
            this.wrapper.className = classes;
            // 设置输入框属性
            this.input.type = showPassword && type === 'password' ? 'text' : type;
            this.input.value = value;
            this.input.placeholder = placeholder;
            this.input.disabled = disabled;
            this.input.readOnly = readonly;
            if (maxlength) {
                this.input.maxLength = maxlength;
            }
            this.input.className = 'jt-input__inner';
            // 构建输入框结构
            let html = '';
            // 前置图标
            if (prefixIcon) {
                html += `<span class="jt-input__prefix"><i class="${prefixIcon}"></i></span>`;
            }
            // 输入框
            html += this.input.outerHTML;
            // 后置内容
            if (suffixIcon || clearable || showPassword || showWordLimit) {
                html += '<span class="jt-input__suffix">';
                // 清除按钮
                if (clearable && value) {
                    html += '<i class="jt-input__icon jt-icon-circle-close" data-action="clear">×</i>';
                }
                // 密码显示切换
                if (showPassword) {
                    const isVisible = this.input.type === 'text';
                    html += `<i class="jt-input__icon jt-icon-view" data-action="toggle-password">${isVisible ? '👁' : '👁‍🗨'}</i>`;
                }
                // 后置图标
                if (suffixIcon) {
                    html += `<i class="${suffixIcon}"></i>`;
                }
                html += '</span>';
            }
            // 字数统计
            if (showWordLimit && maxlength) {
                const currentLength = value.length;
                html += `<span class="jt-input__count">${currentLength}/${maxlength}</span>`;
            }
            this.wrapper.innerHTML = html;
            // 重新获取输入框引用
            this.input = this.wrapper.querySelector('.jt-input__inner');
            // 添加样式
            const style = document.createElement('style');
            style.textContent = this.getStyles();
            this.shadowRoot.innerHTML = '';
            this.shadowRoot.appendChild(style);
            this.shadowRoot.appendChild(this.wrapper);
        }
        bindEvents() {
            // 输入事件
            this.addEventListener('input', (e) => {
                const target = e.target;
                if (target.classList.contains('jt-input__inner')) {
                    this._value = target.value;
                    this.dispatchEvent(new CustomEvent('input', {
                        detail: { value: this._value },
                        bubbles: true
                    }));
                    // 重新渲染以更新清除按钮和字数统计
                    if (this.props.clearable || this.props.showWordLimit) {
                        this.render();
                    }
                }
            });
            // 变化事件
            this.addEventListener('change', (e) => {
                const target = e.target;
                if (target.classList.contains('jt-input__inner')) {
                    this.dispatchEvent(new CustomEvent('change', {
                        detail: { value: this._value },
                        bubbles: true
                    }));
                }
            });
            // 焦点事件
            this.addEventListener('focus', (e) => {
                const target = e.target;
                if (target.classList.contains('jt-input__inner')) {
                    this.wrapper.classList.add('is-focus');
                    this.dispatchEvent(new CustomEvent('focus', {
                        detail: e,
                        bubbles: true
                    }));
                }
            });
            this.addEventListener('blur', (e) => {
                const target = e.target;
                if (target.classList.contains('jt-input__inner')) {
                    this.wrapper.classList.remove('is-focus');
                    this.dispatchEvent(new CustomEvent('blur', {
                        detail: e,
                        bubbles: true
                    }));
                }
            });
            // 图标点击事件
            this.addEventListener('click', (e) => {
                const target = e.target;
                const action = target.getAttribute('data-action');
                if (action === 'clear') {
                    this.value = '';
                    this.input.focus();
                    this.dispatchEvent(new CustomEvent('clear', { bubbles: true }));
                    this.render();
                }
                else if (action === 'toggle-password') {
                    const isPassword = this.input.type === 'password';
                    this.input.type = isPassword ? 'text' : 'password';
                    this.render();
                }
            });
        }
        getStyles() {
            return `
      :host {
        display: inline-block;
        width: 100%;
      }

      .jt-input {
        position: relative;
        font-size: var(--jt-font-size-base);
        display: inline-block;
        width: 100%;
      }

      .jt-input__inner {
        background-color: var(--jt-fill-color-blank);
        background-image: none;
        border-radius: var(--jt-border-radius-base);
        border: 1px solid var(--jt-border-color);
        box-sizing: border-box;
        color: var(--jt-color-text-regular);
        display: inline-block;
        font-size: inherit;
        height: var(--jt-component-size-default);
        line-height: var(--jt-component-size-default);
        outline: none;
        padding: 0 15px;
        transition: var(--jt-transition-border);
        width: 100%;
      }

      .jt-input__inner::placeholder {
        color: var(--jt-color-text-placeholder);
      }

      .jt-input__inner:hover {
        border-color: var(--jt-color-primary-light-5);
      }

      .jt-input.is-focus .jt-input__inner,
      .jt-input__inner:focus {
        border-color: var(--jt-color-primary);
        outline: none;
      }

      /* 大小变体 */
      .jt-input--large .jt-input__inner {
        height: var(--jt-component-size-large);
        line-height: var(--jt-component-size-large);
        font-size: var(--jt-font-size-large);
      }

      .jt-input--small .jt-input__inner {
        height: var(--jt-component-size-small);
        line-height: var(--jt-component-size-small);
        font-size: var(--jt-font-size-small);
      }

      .jt-input--mini .jt-input__inner {
        height: 20px;
        line-height: 20px;
        font-size: var(--jt-font-size-extra-small);
      }

      /* 前置图标 */
      .jt-input--prefix .jt-input__inner {
        padding-left: 30px;
      }

      .jt-input__prefix {
        position: absolute;
        height: 100%;
        left: 5px;
        top: 0;
        text-align: center;
        color: var(--jt-color-text-placeholder);
        transition: var(--jt-transition-all);
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25px;
      }

      /* 后置图标 */
      .jt-input--suffix .jt-input__inner {
        padding-right: 30px;
      }

      .jt-input__suffix {
        position: absolute;
        height: 100%;
        right: 5px;
        top: 0;
        text-align: center;
        color: var(--jt-color-text-placeholder);
        transition: var(--jt-transition-all);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .jt-input__icon {
        cursor: pointer;
        padding: 0 5px;
        transition: var(--jt-transition-color);
      }

      .jt-input__icon:hover {
        color: var(--jt-color-primary);
      }

      /* 字数统计 */
      .jt-input__count {
        position: absolute;
        right: 10px;
        bottom: -20px;
        font-size: var(--jt-font-size-extra-small);
        color: var(--jt-color-text-placeholder);
      }

      /* 禁用状态 */
      .jt-input.is-disabled .jt-input__inner {
        background-color: var(--jt-fill-color-light);
        border-color: var(--jt-border-color-lighter);
        color: var(--jt-color-text-disabled);
        cursor: not-allowed;
      }

      .jt-input.is-disabled .jt-input__inner::placeholder {
        color: var(--jt-color-text-disabled);
      }

      /* 只读状态 */
      .jt-input.is-readonly .jt-input__inner {
        background-color: var(--jt-fill-color-light);
        cursor: default;
      }
    `;
        }
        // 公共方法
        focus() {
            this.input.focus();
        }
        blur() {
            this.input.blur();
        }
        select() {
            this.input.select();
        }
        // 静态方法用于注册组件
        static register() {
            if (!customElements.get('jt-input')) {
                customElements.define('jt-input', JTInput);
            }
        }
    }
    // 自动注册组件
    JTInput.register();

    /**
     * 巨天UI - 开关组件
     * 支持不同大小、颜色、禁用状态
     */
    class JTSwitch extends HTMLElement {
        constructor() {
            super();
            this.props = {};
            this._value = false;
            this.attachShadow({ mode: 'open' });
            this.wrapper = document.createElement('div');
            this.render();
            this.bindEvents();
        }
        static get observedAttributes() {
            return ['value', 'disabled', 'size', 'active-color', 'inactive-color', 'active-text', 'inactive-text', 'width'];
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                this.updateProps();
                this.render();
            }
        }
        connectedCallback() {
            this.updateProps();
            this.render();
        }
        get value() {
            return this._value;
        }
        set value(val) {
            this._value = val;
            this.setAttribute('value', val.toString());
            this.render();
        }
        get active() {
            return this._value;
        }
        set active(val) {
            this.value = val;
        }
        updateProps() {
            this.props = {
                value: this.getAttribute('value') === 'true',
                disabled: this.hasAttribute('disabled'),
                size: this.getAttribute('size') || 'default',
                activeColor: this.getAttribute('active-color') || '',
                inactiveColor: this.getAttribute('inactive-color') || '',
                activeText: this.getAttribute('active-text') || '',
                inactiveText: this.getAttribute('inactive-text') || '',
                width: parseInt(this.getAttribute('width') || '0') || undefined
            };
            this._value = this.props.value || false;
        }
        render() {
            const { value, disabled, size, activeColor, inactiveColor, activeText, inactiveText, width } = this.props;
            // 构建CSS类名
            const classes = [
                'jt-switch',
                `jt-switch--${size}`,
                value ? 'is-checked' : '',
                disabled ? 'is-disabled' : ''
            ].filter(Boolean).join(' ');
            this.wrapper.className = classes;
            // 构建开关结构
            let html = '';
            // 左侧文本
            if (inactiveText) {
                html += `<span class="jt-switch__label jt-switch__label--left ${!value ? 'is-active' : ''}">${inactiveText}</span>`;
            }
            // 开关核心
            html += '<span class="jt-switch__core">';
            html += '<span class="jt-switch__action"></span>';
            html += '</span>';
            // 右侧文本
            if (activeText) {
                html += `<span class="jt-switch__label jt-switch__label--right ${value ? 'is-active' : ''}">${activeText}</span>`;
            }
            this.wrapper.innerHTML = html;
            // 设置自定义样式
            const core = this.wrapper.querySelector('.jt-switch__core');
            if (core) {
                if (width) {
                    core.style.width = `${width}px`;
                }
                if (value && activeColor) {
                    core.style.backgroundColor = activeColor;
                    core.style.borderColor = activeColor;
                }
                else if (!value && inactiveColor) {
                    core.style.backgroundColor = inactiveColor;
                    core.style.borderColor = inactiveColor;
                }
            }
            // 添加样式
            const style = document.createElement('style');
            style.textContent = this.getStyles();
            this.shadowRoot.innerHTML = '';
            this.shadowRoot.appendChild(style);
            this.shadowRoot.appendChild(this.wrapper);
        }
        bindEvents() {
            this.addEventListener('click', (e) => {
                if (this.props.disabled) {
                    return;
                }
                this._value = !this._value;
                this.setAttribute('value', this._value.toString());
                this.dispatchEvent(new CustomEvent('change', {
                    detail: { value: this._value },
                    bubbles: true
                }));
                this.render();
            });
            // 键盘支持
            this.addEventListener('keydown', (e) => {
                if (this.props.disabled) {
                    return;
                }
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
        getStyles() {
            return `
      :host {
        display: inline-flex;
        align-items: center;
        position: relative;
        font-size: var(--jt-font-size-base);
        line-height: 20px;
        vertical-align: middle;
        outline: none;
      }

      .jt-switch {
        display: inline-flex;
        align-items: center;
        position: relative;
        font-size: var(--jt-font-size-base);
        line-height: 20px;
        vertical-align: middle;
        cursor: pointer;
        outline: none;
      }

      .jt-switch__label {
        transition: var(--jt-transition-color);
        height: 20px;
        display: inline-block;
        font-size: var(--jt-font-size-base);
        font-weight: 500;
        cursor: pointer;
        vertical-align: middle;
        color: var(--jt-color-text-primary);
      }

      .jt-switch__label--left {
        margin-right: 10px;
      }

      .jt-switch__label--right {
        margin-left: 10px;
      }

      .jt-switch__label.is-active {
        color: var(--jt-color-primary);
      }

      .jt-switch__core {
        margin: 0;
        display: inline-block;
        position: relative;
        width: 40px;
        height: 20px;
        border: 1px solid var(--jt-border-color);
        outline: none;
        border-radius: 10px;
        box-sizing: border-box;
        background: var(--jt-border-color);
        cursor: pointer;
        transition: var(--jt-transition-all);
        vertical-align: middle;
      }

      .jt-switch__action {
        position: absolute;
        top: 1px;
        left: 1px;
        border-radius: 50%;
        transition: var(--jt-transition-all);
        width: 16px;
        height: 16px;
        background-color: var(--jt-color-white, #fff);
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--jt-color-white, #fff);
      }

      /* 选中状态 */
      .jt-switch.is-checked .jt-switch__core {
        border-color: var(--jt-color-primary);
        background-color: var(--jt-color-primary);
      }

      .jt-switch.is-checked .jt-switch__action {
        left: calc(100% - 17px);
      }

      /* 大小变体 */
      .jt-switch--large .jt-switch__core {
        width: 50px;
        height: 24px;
        border-radius: 12px;
      }

      .jt-switch--large .jt-switch__action {
        width: 20px;
        height: 20px;
        top: 1px;
        left: 1px;
      }

      .jt-switch--large.is-checked .jt-switch__action {
        left: calc(100% - 21px);
      }

      .jt-switch--small .jt-switch__core {
        width: 30px;
        height: 16px;
        border-radius: 8px;
      }

      .jt-switch--small .jt-switch__action {
        width: 12px;
        height: 12px;
        top: 1px;
        left: 1px;
      }

      .jt-switch--small.is-checked .jt-switch__action {
        left: calc(100% - 13px);
      }

      /* 禁用状态 */
      .jt-switch.is-disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .jt-switch.is-disabled .jt-switch__core,
      .jt-switch.is-disabled .jt-switch__label {
        cursor: not-allowed;
      }

      /* 焦点状态 */
      .jt-switch:focus .jt-switch__core {
        outline: 2px solid var(--jt-color-primary-light-5);
        outline-offset: 1px;
      }

      /* 悬停状态 */
      .jt-switch:not(.is-disabled):hover .jt-switch__core {
        border-color: var(--jt-color-primary-light-5);
      }

      .jt-switch:not(.is-disabled).is-checked:hover .jt-switch__core {
        background-color: var(--jt-color-primary-light-3);
      }
    `;
        }
        // 静态方法用于注册组件
        static register() {
            if (!customElements.get('jt-switch')) {
                customElements.define('jt-switch', JTSwitch);
            }
        }
    }
    // 自动注册组件
    JTSwitch.register();

    class JTCheckbox extends HTMLElement {
        static register() {
            if (!customElements.get('jt-checkbox')) {
                customElements.define('jt-checkbox', JTCheckbox);
            }
        }
    }
    JTCheckbox.register();

    class JTRadio extends HTMLElement {
        static register() {
            if (!customElements.get('jt-radio')) {
                customElements.define('jt-radio', JTRadio);
            }
        }
    }
    JTRadio.register();

    /**
     * 巨天UI - 选择器组件
     * 支持单选、多选、搜索、分组、远程数据等功能
     */
    class JTSelect extends HTMLElement {
        constructor() {
            super();
            this.props = {};
            this._value = null;
            this._options = [];
            this.isOpen = false;
            this.filteredOptions = [];
            this.attachShadow({ mode: 'open' });
            this.wrapper = document.createElement('div');
            this.input = document.createElement('input');
            this.dropdown = document.createElement('div');
            this.render();
            this.bindEvents();
        }
        static get observedAttributes() {
            return ['value', 'multiple', 'disabled', 'clearable', 'searchable', 'placeholder', 'size', 'loading', 'no-data-text', 'no-match-text', 'max-tag-count'];
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                this.updateProps();
                this.render();
            }
        }
        connectedCallback() {
            this.updateProps();
            this.loadOptions();
            this.render();
        }
        get value() {
            return this._value;
        }
        set value(val) {
            this._value = val;
            this.setAttribute('value', JSON.stringify(val));
            this.render();
        }
        get options() {
            return this._options;
        }
        set options(opts) {
            this._options = opts;
            this.filteredOptions = [...opts];
            this.render();
        }
        updateProps() {
            this.props = {
                value: this.getAttribute('value') ? JSON.parse(this.getAttribute('value')) : null,
                multiple: this.hasAttribute('multiple'),
                disabled: this.hasAttribute('disabled'),
                clearable: this.hasAttribute('clearable'),
                searchable: this.hasAttribute('searchable'),
                placeholder: this.getAttribute('placeholder') || '请选择',
                size: this.getAttribute('size') || 'medium',
                remote: this.hasAttribute('remote'),
                loading: this.hasAttribute('loading'),
                noDataText: this.getAttribute('no-data-text') || '无数据',
                noMatchText: this.getAttribute('no-match-text') || '无匹配数据',
                maxTagCount: parseInt(this.getAttribute('max-tag-count') || '0') || undefined
            };
            this._value = this.props.value;
        }
        loadOptions() {
            // 从子元素加载选项
            const optionElements = this.querySelectorAll('jt-option');
            this._options = Array.from(optionElements).map(el => ({
                label: el.textContent || '',
                value: el.getAttribute('value') || el.textContent,
                disabled: el.hasAttribute('disabled'),
                group: el.getAttribute('group') || undefined
            }));
            this.filteredOptions = [...this._options];
        }
        render() {
            const { multiple, disabled, clearable, searchable, placeholder, size, loading } = this.props;
            // 构建CSS类名
            const classes = [
                'jt-select',
                `jt-select--${size}`,
                disabled ? 'is-disabled' : '',
                this.isOpen ? 'is-focus' : '',
                multiple ? 'jt-select--multiple' : ''
            ].filter(Boolean).join(' ');
            this.wrapper.className = classes;
            // 构建选择器结构
            let html = '<div class="jt-select__tags">';
            // 多选标签
            if (multiple && Array.isArray(this._value)) {
                const { maxTagCount } = this.props;
                const displayValues = maxTagCount ? this._value.slice(0, maxTagCount) : this._value;
                const hiddenCount = maxTagCount && this._value.length > maxTagCount ? this._value.length - maxTagCount : 0;
                displayValues.forEach((val) => {
                    const option = this._options.find(opt => opt.value === val);
                    if (option) {
                        html += `<span class="jt-select__tag">
            ${option.label}
            <i class="jt-select__tag-close" data-value="${val}">×</i>
          </span>`;
                    }
                });
                if (hiddenCount > 0) {
                    html += `<span class="jt-select__tag">+${hiddenCount}</span>`;
                }
            }
            html += '</div>';
            // 输入框
            const inputValue = this.getDisplayValue();
            this.input.value = inputValue;
            this.input.placeholder = placeholder;
            this.input.disabled = disabled;
            this.input.readOnly = !searchable;
            this.input.className = 'jt-select__input';
            html += this.input.outerHTML;
            // 后缀图标
            html += '<div class="jt-select__suffix">';
            if (loading) {
                html += '<i class="jt-select__loading">⟳</i>';
            }
            else {
                if (clearable && this._value !== null && this._value !== undefined) {
                    html += '<i class="jt-select__clear" data-action="clear">×</i>';
                }
                html += `<i class="jt-select__caret ${this.isOpen ? 'is-reverse' : ''}">▼</i>`;
            }
            html += '</div>';
            // 下拉框
            html += this.renderDropdown();
            this.wrapper.innerHTML = html;
            // 重新获取输入框引用
            this.input = this.wrapper.querySelector('.jt-select__input');
            // 添加样式
            const style = document.createElement('style');
            style.textContent = this.getStyles();
            this.shadowRoot.innerHTML = '';
            this.shadowRoot.appendChild(style);
            this.shadowRoot.appendChild(this.wrapper);
        }
        renderDropdown() {
            const { noDataText, noMatchText } = this.props;
            let html = `<div class="jt-select__dropdown ${this.isOpen ? 'is-visible' : ''}">`;
            if (this.filteredOptions.length === 0) {
                const text = this._options.length === 0 ? noDataText : noMatchText;
                html += `<div class="jt-select__empty">${text}</div>`;
            }
            else {
                // 分组选项
                const groups = this.groupOptions(this.filteredOptions);
                Object.entries(groups).forEach(([groupName, options]) => {
                    if (groupName !== 'undefined') {
                        html += `<div class="jt-select__group-title">${groupName}</div>`;
                    }
                    options.forEach(option => {
                        const isSelected = this.isOptionSelected(option.value);
                        const classes = [
                            'jt-select__option',
                            isSelected ? 'is-selected' : '',
                            option.disabled ? 'is-disabled' : ''
                        ].filter(Boolean).join(' ');
                        html += `<div class="${classes}" data-value="${option.value}">
            ${option.label}
            ${isSelected ? '<i class="jt-select__option-check">✓</i>' : ''}
          </div>`;
                    });
                });
            }
            html += '</div>';
            return html;
        }
        groupOptions(options) {
            return options.reduce((groups, option) => {
                const group = option.group || 'undefined';
                if (!groups[group]) {
                    groups[group] = [];
                }
                groups[group].push(option);
                return groups;
            }, {});
        }
        isOptionSelected(value) {
            if (this.props.multiple) {
                return Array.isArray(this._value) && this._value.includes(value);
            }
            return this._value === value;
        }
        getDisplayValue() {
            if (this.props.multiple) {
                return '';
            }
            if (this._value === null || this._value === undefined) {
                return '';
            }
            const option = this._options.find(opt => opt.value === this._value);
            return option ? option.label : String(this._value);
        }
        bindEvents() {
            // 点击事件
            this.addEventListener('click', (e) => {
                if (this.props.disabled)
                    return;
                const target = e.target;
                const action = target.getAttribute('data-action');
                if (action === 'clear') {
                    this.clearValue();
                    return;
                }
                // 标签关闭
                if (target.classList.contains('jt-select__tag-close')) {
                    const value = target.getAttribute('data-value');
                    this.removeValue(value);
                    return;
                }
                // 选项点击
                if (target.classList.contains('jt-select__option') && !target.classList.contains('is-disabled')) {
                    const value = target.getAttribute('data-value');
                    this.selectOption(value);
                    return;
                }
                // 切换下拉框
                if (!target.classList.contains('jt-select__option')) {
                    this.toggleDropdown();
                }
            });
            // 输入事件（搜索）
            this.addEventListener('input', (e) => {
                const target = e.target;
                if (target.classList.contains('jt-select__input') && this.props.searchable) {
                    this.filterOptions(target.value);
                }
            });
            // 键盘事件
            this.addEventListener('keydown', (e) => {
                if (this.props.disabled)
                    return;
                switch (e.key) {
                    case 'Enter':
                        e.preventDefault();
                        if (!this.isOpen) {
                            this.openDropdown();
                        }
                        break;
                    case 'Escape':
                        this.closeDropdown();
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        if (!this.isOpen) {
                            this.openDropdown();
                        }
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        break;
                }
            });
            // 点击外部关闭
            document.addEventListener('click', (e) => {
                if (!this.contains(e.target)) {
                    this.closeDropdown();
                }
            });
        }
        toggleDropdown() {
            if (this.isOpen) {
                this.closeDropdown();
            }
            else {
                this.openDropdown();
            }
        }
        openDropdown() {
            this.isOpen = true;
            this.render();
        }
        closeDropdown() {
            this.isOpen = false;
            this.render();
        }
        selectOption(value) {
            if (this.props.multiple) {
                const currentValue = Array.isArray(this._value) ? [...this._value] : [];
                const index = currentValue.indexOf(value);
                if (index > -1) {
                    currentValue.splice(index, 1);
                }
                else {
                    currentValue.push(value);
                }
                this._value = currentValue;
            }
            else {
                this._value = value;
                this.closeDropdown();
            }
            this.setAttribute('value', JSON.stringify(this._value));
            this.dispatchEvent(new CustomEvent('change', {
                detail: { value: this._value },
                bubbles: true
            }));
            this.render();
        }
        removeValue(value) {
            if (this.props.multiple && Array.isArray(this._value)) {
                const index = this._value.indexOf(value);
                if (index > -1) {
                    this._value.splice(index, 1);
                    this.setAttribute('value', JSON.stringify(this._value));
                    this.dispatchEvent(new CustomEvent('change', {
                        detail: { value: this._value },
                        bubbles: true
                    }));
                    this.render();
                }
            }
        }
        clearValue() {
            this._value = this.props.multiple ? [] : null;
            this.setAttribute('value', JSON.stringify(this._value));
            this.dispatchEvent(new CustomEvent('clear', { bubbles: true }));
            this.dispatchEvent(new CustomEvent('change', {
                detail: { value: this._value },
                bubbles: true
            }));
            this.render();
        }
        filterOptions(query) {
            if (!query) {
                this.filteredOptions = [...this._options];
            }
            else {
                this.filteredOptions = this._options.filter(option => option.label.toLowerCase().includes(query.toLowerCase()));
            }
            this.render();
        }
        getStyles() {
            return `
      :host {
        display: inline-block;
        width: 100%;
      }

      .jt-select {
        position: relative;
        display: inline-block;
        width: 100%;
        cursor: pointer;
        font-size: var(--jt-font-size-base);
        border: 1px solid var(--jt-border-color);
        border-radius: var(--jt-border-radius-base);
        background-color: var(--jt-fill-color-blank);
        transition: var(--jt-transition-border);
        min-height: var(--jt-component-size-default);
      }

      .jt-select:hover {
        border-color: var(--jt-color-primary-light-5);
      }

      .jt-select.is-focus {
        border-color: var(--jt-color-primary);
        outline: none;
      }

      .jt-select.is-disabled {
        background-color: var(--jt-fill-color-light);
        border-color: var(--jt-border-color-lighter);
        cursor: not-allowed;
      }

      .jt-select__tags {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px;
        padding: 2px 8px;
        min-height: calc(var(--jt-component-size-default) - 2px);
      }

      .jt-select__tag {
        display: inline-flex;
        align-items: center;
        padding: 0 8px;
        height: 24px;
        background-color: var(--jt-fill-color);
        border: 1px solid var(--jt-border-color-light);
        border-radius: var(--jt-border-radius-small);
        font-size: var(--jt-font-size-small);
        color: var(--jt-color-text-regular);
        white-space: nowrap;
      }

      .jt-select__tag-close {
        margin-left: 4px;
        cursor: pointer;
        color: var(--jt-color-text-placeholder);
        transition: var(--jt-transition-color);
      }

      .jt-select__tag-close:hover {
        color: var(--jt-color-text-regular);
      }

      .jt-select__input {
        border: none;
        outline: none;
        background: transparent;
        color: var(--jt-color-text-regular);
        font-size: inherit;
        flex: 1;
        min-width: 0;
        padding: 0 8px;
        height: calc(var(--jt-component-size-default) - 2px);
        line-height: calc(var(--jt-component-size-default) - 2px);
      }

      .jt-select--multiple .jt-select__input {
        height: auto;
        min-height: 20px;
        line-height: 20px;
        padding: 2px 8px;
      }

      .jt-select__input::placeholder {
        color: var(--jt-color-text-placeholder);
      }

      .jt-select__suffix {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        gap: 4px;
        color: var(--jt-color-text-placeholder);
      }

      .jt-select__clear,
      .jt-select__caret {
        cursor: pointer;
        transition: var(--jt-transition-color);
      }

      .jt-select__clear:hover {
        color: var(--jt-color-text-regular);
      }

      .jt-select__caret {
        transition: var(--jt-transition-all);
      }

      .jt-select__caret.is-reverse {
        transform: rotate(180deg);
      }

      .jt-select__loading {
        animation: jt-spin 1s linear infinite;
      }

      .jt-select__dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        z-index: var(--jt-index-popper);
        background: var(--jt-fill-color-blank);
        border: 1px solid var(--jt-border-color-light);
        border-radius: var(--jt-border-radius-base);
        box-shadow: var(--jt-box-shadow-light);
        max-height: 200px;
        overflow-y: auto;
        margin-top: 4px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: var(--jt-transition-all);
      }

      .jt-select__dropdown.is-visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .jt-select__empty {
        padding: 8px 12px;
        color: var(--jt-color-text-placeholder);
        text-align: center;
      }

      .jt-select__group-title {
        padding: 8px 12px 4px;
        font-size: var(--jt-font-size-small);
        color: var(--jt-color-text-secondary);
        font-weight: 500;
      }

      .jt-select__option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        cursor: pointer;
        color: var(--jt-color-text-regular);
        transition: var(--jt-transition-all);
      }

      .jt-select__option:hover {
        background-color: var(--jt-fill-color-light);
      }

      .jt-select__option.is-selected {
        color: var(--jt-color-primary);
        background-color: var(--jt-color-primary-light-9);
      }

      .jt-select__option.is-disabled {
        color: var(--jt-color-text-disabled);
        cursor: not-allowed;
      }

      .jt-select__option.is-disabled:hover {
        background-color: transparent;
      }

      .jt-select__option-check {
        color: var(--jt-color-primary);
      }

      /* 大小变体 */
      .jt-select--large {
        min-height: var(--jt-component-size-large);
      }

      .jt-select--large .jt-select__input {
        height: calc(var(--jt-component-size-large) - 2px);
        line-height: calc(var(--jt-component-size-large) - 2px);
        font-size: var(--jt-font-size-large);
      }

      .jt-select--small {
        min-height: var(--jt-component-size-small);
      }

      .jt-select--small .jt-select__input {
        height: calc(var(--jt-component-size-small) - 2px);
        line-height: calc(var(--jt-component-size-small) - 2px);
        font-size: var(--jt-font-size-small);
      }

      .jt-select--mini {
        min-height: 20px;
      }

      .jt-select--mini .jt-select__input {
        height: 18px;
        line-height: 18px;
        font-size: var(--jt-font-size-extra-small);
      }

      @keyframes jt-spin {
        to {
          transform: rotate(360deg);
        }
      }
    `;
        }
        // 公共方法
        focus() {
            this.input.focus();
        }
        blur() {
            this.input.blur();
        }
        // 静态方法用于注册组件
        static register() {
            if (!customElements.get('jt-select')) {
                customElements.define('jt-select', JTSelect);
            }
        }
    }
    // 选项组件
    class JTOption extends HTMLElement {
        static register() {
            if (!customElements.get('jt-option')) {
                customElements.define('jt-option', JTOption);
            }
        }
    }
    // 自动注册组件
    JTSelect.register();
    JTOption.register();

    /**
     * 巨天UI - 表格组件
     * 支持排序、筛选、分页、固定列、展开行、树形数据等功能
     */
    class JTTable extends HTMLElement {
        constructor() {
            super();
            this.props = {};
            this._data = [];
            this._columns = [];
            this.sortColumn = null;
            this.sortOrder = null;
            this.filters = {};
            this.selection = [];
            this.currentRow = null;
            this.expandedRows = new Set();
            this.attachShadow({ mode: 'open' });
            this.wrapper = document.createElement('div');
            this.render();
            this.bindEvents();
        }
        static get observedAttributes() {
            return ['data', 'columns', 'height', 'max-height', 'stripe', 'border', 'size', 'fit', 'show-header', 'highlight-current-row', 'empty-text', 'default-expand-all'];
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                this.updateProps();
                this.render();
            }
        }
        connectedCallback() {
            this.updateProps();
            this.loadColumns();
            this.render();
        }
        get data() {
            return this._data;
        }
        set data(val) {
            this._data = val || [];
            this.setAttribute('data', JSON.stringify(this._data));
            this.render();
        }
        get columns() {
            return this._columns;
        }
        set columns(val) {
            this._columns = val || [];
            this.render();
        }
        updateProps() {
            this.props = {
                data: this.getAttribute('data') ? JSON.parse(this.getAttribute('data')) : [],
                height: this.getAttribute('height') || undefined,
                maxHeight: this.getAttribute('max-height') || undefined,
                stripe: this.hasAttribute('stripe'),
                border: this.hasAttribute('border'),
                size: this.getAttribute('size') || 'medium',
                fit: this.hasAttribute('fit'),
                showHeader: !this.hasAttribute('show-header') || this.getAttribute('show-header') !== 'false',
                highlightCurrentRow: this.hasAttribute('highlight-current-row'),
                emptyText: this.getAttribute('empty-text') || '暂无数据',
                defaultExpandAll: this.hasAttribute('default-expand-all')
            };
            this._data = this.props.data || [];
        }
        loadColumns() {
            // 从子元素加载列配置
            const columnElements = this.querySelectorAll('jt-table-column');
            this._columns = Array.from(columnElements).map(el => ({
                prop: el.getAttribute('prop') || '',
                label: el.getAttribute('label') || '',
                width: el.getAttribute('width') || undefined,
                minWidth: el.getAttribute('min-width') || undefined,
                fixed: el.getAttribute('fixed') || undefined,
                sortable: el.hasAttribute('sortable'),
                filterable: el.hasAttribute('filterable'),
                align: el.getAttribute('align') || 'left',
                headerAlign: el.getAttribute('header-align') || undefined,
                showOverflowTooltip: el.hasAttribute('show-overflow-tooltip'),
                resizable: el.hasAttribute('resizable'),
                type: el.getAttribute('type') || undefined
            }));
        }
        render() {
            const { stripe, border, size, height, maxHeight, showHeader, emptyText } = this.props;
            // 构建CSS类名
            const classes = [
                'jt-table',
                `jt-table--${size}`,
                stripe ? 'jt-table--striped' : '',
                border ? 'jt-table--border' : '',
                'jt-table--enable-row-hover'
            ].filter(Boolean).join(' ');
            this.wrapper.className = classes;
            // 设置表格样式
            let tableStyle = '';
            if (height) {
                tableStyle += `height: ${typeof height === 'number' ? height + 'px' : height};`;
            }
            if (maxHeight) {
                tableStyle += `max-height: ${typeof maxHeight === 'number' ? maxHeight + 'px' : maxHeight};`;
            }
            let html = `<div class="jt-table__wrapper" style="${tableStyle}">`;
            // 表格头部
            if (showHeader) {
                html += this.renderHeader();
            }
            // 表格主体
            html += this.renderBody();
            // 空数据提示
            if (this.getFilteredData().length === 0) {
                html += `<div class="jt-table__empty-block">
        <span class="jt-table__empty-text">${emptyText}</span>
      </div>`;
            }
            html += '</div>';
            this.wrapper.innerHTML = html;
            // 添加样式
            const style = document.createElement('style');
            style.textContent = this.getStyles();
            this.shadowRoot.innerHTML = '';
            this.shadowRoot.appendChild(style);
            this.shadowRoot.appendChild(this.wrapper);
        }
        renderHeader() {
            let html = '<div class="jt-table__header-wrapper"><table class="jt-table__header"><thead>';
            html += '<tr class="jt-table__header-row">';
            this._columns.forEach((column, index) => {
                const { label, width, minWidth, align, headerAlign, sortable, filterable, fixed, resizable } = column;
                let cellStyle = '';
                if (width) {
                    cellStyle += `width: ${typeof width === 'number' ? width + 'px' : width};`;
                }
                if (minWidth) {
                    cellStyle += `min-width: ${typeof minWidth === 'number' ? minWidth + 'px' : minWidth};`;
                }
                const cellAlign = headerAlign || align || 'left';
                const classes = [
                    'jt-table__header-cell',
                    `jt-table__header-cell--${cellAlign}`,
                    fixed ? `jt-table__fixed-column--${fixed}` : '',
                    sortable ? 'jt-table__header-cell--sortable' : '',
                    this.sortColumn === column.prop ? `jt-table__header-cell--${this.sortOrder}` : ''
                ].filter(Boolean).join(' ');
                html += `<th class="${classes}" style="${cellStyle}" data-column-index="${index}">`;
                html += `<div class="jt-table__cell">`;
                html += `<span class="jt-table__column-label">${label}</span>`;
                if (sortable) {
                    html += `<span class="jt-table__sort-caret">
          <i class="jt-table__sort-caret--ascending ${this.sortColumn === column.prop && this.sortOrder === 'ascending' ? 'is-active' : ''}">▲</i>
          <i class="jt-table__sort-caret--descending ${this.sortColumn === column.prop && this.sortOrder === 'descending' ? 'is-active' : ''}">▼</i>
        </span>`;
                }
                if (filterable) {
                    html += `<span class="jt-table__filter-trigger">⚙</span>`;
                }
                html += '</div>';
                html += '</th>';
            });
            html += '</tr></thead></table></div>';
            return html;
        }
        renderBody() {
            const data = this.getFilteredData();
            let html = '<div class="jt-table__body-wrapper"><table class="jt-table__body"><tbody>';
            data.forEach((row, rowIndex) => {
                html += this.renderRow(row, rowIndex);
            });
            html += '</tbody></table></div>';
            return html;
        }
        renderRow(row, rowIndex) {
            const { stripe, highlightCurrentRow, rowClassName, rowStyle } = this.props;
            let classes = ['jt-table__row'];
            if (stripe && rowIndex % 2 === 1) {
                classes.push('jt-table__row--striped');
            }
            if (highlightCurrentRow && this.currentRow === row) {
                classes.push('jt-table__row--current');
            }
            if (this.selection.includes(row)) {
                classes.push('jt-table__row--selected');
            }
            // 自定义行类名
            if (typeof rowClassName === 'string') {
                classes.push(rowClassName);
            }
            else if (typeof rowClassName === 'function') {
                classes.push(rowClassName(row, rowIndex));
            }
            let style = '';
            if (typeof rowStyle === 'object') {
                style = Object.entries(rowStyle).map(([key, value]) => `${key}: ${value}`).join('; ');
            }
            else if (typeof rowStyle === 'function') {
                const styleObj = rowStyle(row, rowIndex);
                style = Object.entries(styleObj).map(([key, value]) => `${key}: ${value}`).join('; ');
            }
            let html = `<tr class="${classes.join(' ')}" style="${style}" data-row-index="${rowIndex}">`;
            this._columns.forEach((column, columnIndex) => {
                html += this.renderCell(row, column, rowIndex, columnIndex);
            });
            html += '</tr>';
            return html;
        }
        renderCell(row, column, rowIndex, columnIndex) {
            const { prop, width, minWidth, align, showOverflowTooltip, type, formatter, render } = column;
            let cellValue = row[prop];
            let cellContent = '';
            // 特殊列类型
            if (type === 'selection') {
                const checked = this.selection.includes(row);
                cellContent = `<input type="checkbox" class="jt-table__selection" ${checked ? 'checked' : ''} data-row-index="${rowIndex}">`;
            }
            else if (type === 'index') {
                cellContent = String(rowIndex + 1);
            }
            else if (type === 'expand') {
                const expanded = this.expandedRows.has(row);
                cellContent = `<i class="jt-table__expand-icon ${expanded ? 'jt-table__expand-icon--expanded' : ''}" data-row-index="${rowIndex}">▶</i>`;
            }
            else {
                // 格式化器
                if (formatter) {
                    cellContent = formatter(row, column, cellValue, rowIndex);
                }
                else if (render) {
                    cellContent = render(row, column, cellValue, rowIndex);
                }
                else {
                    cellContent = cellValue != null ? String(cellValue) : '';
                }
            }
            let cellStyle = '';
            if (width) {
                cellStyle += `width: ${typeof width === 'number' ? width + 'px' : width};`;
            }
            if (minWidth) {
                cellStyle += `min-width: ${typeof minWidth === 'number' ? minWidth + 'px' : minWidth};`;
            }
            const cellAlign = align || 'left';
            const classes = [
                'jt-table__cell',
                `jt-table__cell--${cellAlign}`,
                showOverflowTooltip ? 'jt-table__cell--tooltip' : ''
            ].filter(Boolean).join(' ');
            return `<td class="${classes}" style="${cellStyle}" data-column-index="${columnIndex}">
      <div class="jt-table__cell-content">${cellContent}</div>
    </td>`;
        }
        getFilteredData() {
            let data = [...this._data];
            // 应用筛选
            Object.entries(this.filters).forEach(([prop, values]) => {
                if (values.length > 0) {
                    data = data.filter(row => values.includes(row[prop]));
                }
            });
            // 应用排序
            if (this.sortColumn && this.sortOrder) {
                data.sort((a, b) => {
                    const aVal = a[this.sortColumn];
                    const bVal = b[this.sortColumn];
                    let result = 0;
                    if (aVal < bVal)
                        result = -1;
                    else if (aVal > bVal)
                        result = 1;
                    return this.sortOrder === 'descending' ? -result : result;
                });
            }
            return data;
        }
        bindEvents() {
            // 表头点击事件（排序）
            this.addEventListener('click', (e) => {
                const target = e.target;
                // 排序
                if (target.closest('.jt-table__header-cell--sortable')) {
                    const cell = target.closest('.jt-table__header-cell');
                    const columnIndex = parseInt(cell.getAttribute('data-column-index') || '0');
                    const column = this._columns[columnIndex];
                    if (column.sortable) {
                        this.sort(column.prop);
                    }
                }
                // 选择
                if (target.classList.contains('jt-table__selection')) {
                    const checkbox = target;
                    const rowIndex = parseInt(checkbox.getAttribute('data-row-index') || '0');
                    const row = this.getFilteredData()[rowIndex];
                    if (checkbox.checked) {
                        this.selectRow(row);
                    }
                    else {
                        this.unselectRow(row);
                    }
                }
                // 展开
                if (target.classList.contains('jt-table__expand-icon')) {
                    const rowIndex = parseInt(target.getAttribute('data-row-index') || '0');
                    const row = this.getFilteredData()[rowIndex];
                    this.toggleRowExpansion(row);
                }
                // 行点击
                if (target.closest('.jt-table__row')) {
                    const rowElement = target.closest('.jt-table__row');
                    const rowIndex = parseInt(rowElement.getAttribute('data-row-index') || '0');
                    const row = this.getFilteredData()[rowIndex];
                    if (this.props.highlightCurrentRow) {
                        this.setCurrentRow(row);
                    }
                    this.dispatchEvent(new CustomEvent('row-click', {
                        detail: { row, rowIndex },
                        bubbles: true
                    }));
                }
            });
        }
        sort(prop) {
            if (this.sortColumn === prop) {
                // 切换排序方向
                if (this.sortOrder === 'ascending') {
                    this.sortOrder = 'descending';
                }
                else if (this.sortOrder === 'descending') {
                    this.sortColumn = null;
                    this.sortOrder = null;
                }
                else {
                    this.sortOrder = 'ascending';
                }
            }
            else {
                this.sortColumn = prop;
                this.sortOrder = 'ascending';
            }
            this.dispatchEvent(new CustomEvent('sort-change', {
                detail: { column: this.sortColumn, order: this.sortOrder },
                bubbles: true
            }));
            this.render();
        }
        selectRow(row) {
            if (!this.selection.includes(row)) {
                this.selection.push(row);
                this.dispatchEvent(new CustomEvent('selection-change', {
                    detail: { selection: [...this.selection] },
                    bubbles: true
                }));
                this.render();
            }
        }
        unselectRow(row) {
            const index = this.selection.indexOf(row);
            if (index > -1) {
                this.selection.splice(index, 1);
                this.dispatchEvent(new CustomEvent('selection-change', {
                    detail: { selection: [...this.selection] },
                    bubbles: true
                }));
                this.render();
            }
        }
        setCurrentRow(row) {
            this.currentRow = row;
            this.dispatchEvent(new CustomEvent('current-change', {
                detail: { currentRow: row },
                bubbles: true
            }));
            this.render();
        }
        toggleRowExpansion(row) {
            if (this.expandedRows.has(row)) {
                this.expandedRows.delete(row);
            }
            else {
                this.expandedRows.add(row);
            }
            this.dispatchEvent(new CustomEvent('expand-change', {
                detail: { row, expanded: this.expandedRows.has(row) },
                bubbles: true
            }));
            this.render();
        }
        getStyles() {
            return `
      :host {
        display: block;
        width: 100%;
      }

      .jt-table {
        position: relative;
        box-sizing: border-box;
        flex: 1;
        width: 100%;
        max-width: 100%;
        background-color: var(--jt-fill-color-blank);
        font-size: var(--jt-font-size-base);
        color: var(--jt-color-text-primary);
      }

      .jt-table__wrapper {
        position: relative;
        overflow: hidden;
        border: 1px solid var(--jt-border-color-lighter);
        border-radius: var(--jt-border-radius-base);
      }

      .jt-table__header-wrapper,
      .jt-table__body-wrapper {
        overflow-x: auto;
      }

      .jt-table__header,
      .jt-table__body {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        table-layout: fixed;
      }

      .jt-table__header-row {
        background-color: var(--jt-fill-color-light);
      }

      .jt-table__header-cell {
        padding: 12px 8px;
        border-bottom: 1px solid var(--jt-border-color-lighter);
        border-right: 1px solid var(--jt-border-color-lighter);
        background-color: var(--jt-fill-color-light);
        font-weight: 500;
        color: var(--jt-color-text-regular);
        text-align: left;
        vertical-align: middle;
        position: relative;
        user-select: none;
      }

      .jt-table__header-cell:last-child {
        border-right: none;
      }

      .jt-table__header-cell--center {
        text-align: center;
      }

      .jt-table__header-cell--right {
        text-align: right;
      }

      .jt-table__header-cell--sortable {
        cursor: pointer;
      }

      .jt-table__header-cell--sortable:hover {
        background-color: var(--jt-fill-color);
      }

      .jt-table__cell {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .jt-table__column-label {
        flex: 1;
      }

      .jt-table__sort-caret {
        display: flex;
        flex-direction: column;
        margin-left: 4px;
        font-size: 10px;
        line-height: 1;
      }

      .jt-table__sort-caret i {
        color: var(--jt-color-text-placeholder);
        transition: var(--jt-transition-color);
      }

      .jt-table__sort-caret i.is-active {
        color: var(--jt-color-primary);
      }

      .jt-table__filter-trigger {
        margin-left: 4px;
        cursor: pointer;
        color: var(--jt-color-text-placeholder);
        transition: var(--jt-transition-color);
      }

      .jt-table__filter-trigger:hover {
        color: var(--jt-color-primary);
      }

      .jt-table__row {
        background-color: var(--jt-fill-color-blank);
        transition: var(--jt-transition-all);
      }

      .jt-table__row:hover {
        background-color: var(--jt-fill-color-light);
      }

      .jt-table__row--striped {
        background-color: var(--jt-fill-color-lighter);
      }

      .jt-table__row--current {
        background-color: var(--jt-color-primary-light-9);
      }

      .jt-table__row--selected {
        background-color: var(--jt-color-primary-light-8);
      }

      .jt-table__cell {
        padding: 12px 8px;
        border-bottom: 1px solid var(--jt-border-color-lighter);
        border-right: 1px solid var(--jt-border-color-lighter);
        vertical-align: middle;
        word-break: break-all;
        word-wrap: break-word;
      }

      .jt-table__cell:last-child {
        border-right: none;
      }

      .jt-table__cell--center {
        text-align: center;
      }

      .jt-table__cell--right {
        text-align: right;
      }

      .jt-table__cell--tooltip {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .jt-table__cell-content {
        line-height: 1.5;
      }

      .jt-table__selection {
        cursor: pointer;
      }

      .jt-table__expand-icon {
        cursor: pointer;
        transition: var(--jt-transition-all);
        color: var(--jt-color-text-placeholder);
      }

      .jt-table__expand-icon:hover {
        color: var(--jt-color-primary);
      }

      .jt-table__expand-icon--expanded {
        transform: rotate(90deg);
      }

      .jt-table__empty-block {
        position: relative;
        min-height: 60px;
        text-align: center;
        width: 100%;
        height: 100%;
      }

      .jt-table__empty-text {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: var(--jt-color-text-secondary);
      }

      /* 边框样式 */
      .jt-table--border .jt-table__header-cell,
      .jt-table--border .jt-table__cell {
        border-right: 1px solid var(--jt-border-color-lighter);
      }

      /* 大小变体 */
      .jt-table--large .jt-table__header-cell,
      .jt-table--large .jt-table__cell {
        padding: 16px 12px;
      }

      .jt-table--small .jt-table__header-cell,
      .jt-table--small .jt-table__cell {
        padding: 8px 6px;
      }

      .jt-table--mini .jt-table__header-cell,
      .jt-table--mini .jt-table__cell {
        padding: 4px 3px;
      }
    `;
        }
        // 公共方法
        clearSelection() {
            this.selection = [];
            this.render();
        }
        toggleRowSelection(row, selected) {
            if (selected === undefined) {
                selected = !this.selection.includes(row);
            }
            if (selected) {
                this.selectRow(row);
            }
            else {
                this.unselectRow(row);
            }
        }
        toggleAllSelection() {
            const data = this.getFilteredData();
            if (this.selection.length === data.length) {
                this.clearSelection();
            }
            else {
                this.selection = [...data];
                this.render();
            }
        }
        clearSort() {
            this.sortColumn = null;
            this.sortOrder = null;
            this.render();
        }
        clearFilter(columnKey) {
            if (columnKey) {
                delete this.filters[columnKey];
            }
            else {
                this.filters = {};
            }
            this.render();
        }
        // 静态方法用于注册组件
        static register() {
            if (!customElements.get('jt-table')) {
                customElements.define('jt-table', JTTable);
            }
        }
    }
    // 表格列组件
    class JTTableColumn extends HTMLElement {
        static register() {
            if (!customElements.get('jt-table-column')) {
                customElements.define('jt-table-column', JTTableColumn);
            }
        }
    }
    // 自动注册组件
    JTTable.register();
    JTTableColumn.register();

    /**
     * 巨天UI - 日期选择器组件
     * 支持日期、时间、日期时间、范围选择等功能
     */
    class JTDatePicker extends HTMLElement {
        constructor() {
            super();
            this.props = {};
            this._value = null;
            this.isOpen = false;
            this.currentDate = new Date();
            this.viewDate = new Date();
            this.isRange = false;
            this.rangeStart = null;
            this.rangeEnd = null;
            this.attachShadow({ mode: 'open' });
            this.wrapper = document.createElement('div');
            this.input = document.createElement('input');
            this.panel = document.createElement('div');
            this.render();
            this.bindEvents();
        }
        static get observedAttributes() {
            return ['value', 'type', 'format', 'value-format', 'placeholder', 'start-placeholder', 'end-placeholder', 'range-separator', 'disabled', 'clearable', 'size', 'editable'];
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                this.updateProps();
                this.render();
            }
        }
        connectedCallback() {
            this.updateProps();
            this.render();
        }
        get value() {
            return this._value;
        }
        set value(val) {
            this._value = val;
            if (val) {
                this.setAttribute('value', typeof val === 'string' ? val : JSON.stringify(val));
            }
            else {
                this.removeAttribute('value');
            }
            this.render();
        }
        updateProps() {
            this.props = {
                value: this.getAttribute('value') || null,
                type: this.getAttribute('type') || 'date',
                format: this.getAttribute('format') || this.getDefaultFormat(),
                valueFormat: this.getAttribute('value-format') || 'YYYY-MM-DD',
                placeholder: this.getAttribute('placeholder') || '选择日期',
                startPlaceholder: this.getAttribute('start-placeholder') || '开始日期',
                endPlaceholder: this.getAttribute('end-placeholder') || '结束日期',
                rangeSeparator: this.getAttribute('range-separator') || ' 至 ',
                disabled: this.hasAttribute('disabled'),
                clearable: this.hasAttribute('clearable'),
                size: this.getAttribute('size') || 'medium',
                editable: !this.hasAttribute('editable') || this.getAttribute('editable') !== 'false',
                prefixIcon: this.getAttribute('prefix-icon') || '📅',
                clearIcon: this.getAttribute('clear-icon') || '×',
                firstDayOfWeek: parseInt(this.getAttribute('first-day-of-week') || '1'),
                unlinkPanels: this.hasAttribute('unlink-panels'),
                timeArrowControl: this.hasAttribute('time-arrow-control')
            };
            this.isRange = this.props.type?.includes('range') || false;
            this._value = this.parseValue(this.props.value);
        }
        getDefaultFormat() {
            const { type } = this.props;
            switch (type) {
                case 'datetime':
                case 'datetimerange':
                    return 'YYYY-MM-DD HH:mm:ss';
                case 'time':
                    return 'HH:mm:ss';
                case 'week':
                    return 'YYYY 第 WW 周';
                case 'month':
                    return 'YYYY-MM';
                case 'year':
                    return 'YYYY';
                default:
                    return 'YYYY-MM-DD';
            }
        }
        parseValue(value) {
            if (!value)
                return null;
            if (this.isRange) {
                try {
                    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
                    return Array.isArray(parsed) ? parsed.map(v => new Date(v)) : null;
                }
                catch {
                    return null;
                }
            }
            else {
                return new Date(value);
            }
        }
        formatValue(value) {
            if (!value)
                return '';
            const { format } = this.props;
            if (this.isRange && Array.isArray(value)) {
                return value.map(v => this.formatDate(v, format)).join(this.props.rangeSeparator);
            }
            else if (value instanceof Date) {
                return this.formatDate(value, format);
            }
            return '';
        }
        formatDate(date, format) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            const week = this.getWeekNumber(date);
            return format
                .replace('YYYY', String(year))
                .replace('MM', month)
                .replace('DD', day)
                .replace('HH', hours)
                .replace('mm', minutes)
                .replace('ss', seconds)
                .replace('WW', String(week).padStart(2, '0'));
        }
        getWeekNumber(date) {
            const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            const dayNum = d.getUTCDay() || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
            const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
        }
        render() {
            const { disabled, clearable, size, placeholder, startPlaceholder, endPlaceholder, prefixIcon } = this.props;
            // 构建CSS类名
            const classes = [
                'jt-date-picker',
                `jt-date-picker--${size}`,
                disabled ? 'is-disabled' : '',
                this.isOpen ? 'is-focus' : '',
                this.isRange ? 'jt-date-picker--range' : ''
            ].filter(Boolean).join(' ');
            this.wrapper.className = classes;
            // 构建输入框结构
            let html = '<div class="jt-date-picker__editor">';
            // 前置图标
            if (prefixIcon) {
                html += `<span class="jt-date-picker__prefix-icon">${prefixIcon}</span>`;
            }
            if (this.isRange) {
                // 范围选择器
                const values = Array.isArray(this._value) ? this._value : [null, null];
                const startValue = values[0] ? this.formatValue(values[0]) : '';
                const endValue = values[1] ? this.formatValue(values[1]) : '';
                html += `<input class="jt-date-picker__input jt-date-picker__input--start" 
                      placeholder="${startPlaceholder}" 
                      value="${startValue}" 
                      ${disabled ? 'disabled' : ''} 
                      ${!this.props.editable ? 'readonly' : ''}>`;
                html += `<span class="jt-date-picker__range-separator">${this.props.rangeSeparator}</span>`;
                html += `<input class="jt-date-picker__input jt-date-picker__input--end" 
                      placeholder="${endPlaceholder}" 
                      value="${endValue}" 
                      ${disabled ? 'disabled' : ''} 
                      ${!this.props.editable ? 'readonly' : ''}>`;
            }
            else {
                // 单个选择器
                const displayValue = this.formatValue(this._value);
                html += `<input class="jt-date-picker__input" 
                      placeholder="${placeholder}" 
                      value="${displayValue}" 
                      ${disabled ? 'disabled' : ''} 
                      ${!this.props.editable ? 'readonly' : ''}>`;
            }
            // 后置图标
            html += '<span class="jt-date-picker__suffix-icon">';
            if (clearable && this._value) {
                html += `<i class="jt-date-picker__clear-icon" data-action="clear">${this.props.clearIcon}</i>`;
            }
            html += `<i class="jt-date-picker__caret ${this.isOpen ? 'is-reverse' : ''}">▼</i>`;
            html += '</span>';
            html += '</div>';
            // 日期面板
            html += this.renderPanel();
            this.wrapper.innerHTML = html;
            // 添加样式
            const style = document.createElement('style');
            style.textContent = this.getStyles();
            this.shadowRoot.innerHTML = '';
            this.shadowRoot.appendChild(style);
            this.shadowRoot.appendChild(this.wrapper);
        }
        renderPanel() {
            const { type } = this.props;
            let html = `<div class="jt-date-picker__panel ${this.isOpen ? 'is-visible' : ''}">`;
            // 快捷选项
            if (this.props.shortcuts) {
                html += '<div class="jt-date-picker__shortcuts">';
                this.props.shortcuts.forEach((shortcut, index) => {
                    html += `<button class="jt-date-picker__shortcut" data-shortcut-index="${index}">${shortcut.text}</button>`;
                });
                html += '</div>';
            }
            // 主面板
            html += '<div class="jt-date-picker__content">';
            switch (type) {
                case 'date':
                case 'daterange':
                    html += this.renderDatePanel();
                    break;
                case 'datetime':
                case 'datetimerange':
                    html += this.renderDateTimePanel();
                    break;
                case 'time':
                    html += this.renderTimePanel();
                    break;
                case 'week':
                    html += this.renderWeekPanel();
                    break;
                case 'month':
                    html += this.renderMonthPanel();
                    break;
                case 'year':
                    html += this.renderYearPanel();
                    break;
            }
            html += '</div>';
            html += '</div>';
            return html;
        }
        renderDatePanel() {
            const year = this.viewDate.getFullYear();
            const month = this.viewDate.getMonth();
            let html = '<div class="jt-date-picker__date-panel">';
            // 头部导航
            html += `<div class="jt-date-picker__header">
      <button class="jt-date-picker__prev-btn jt-date-picker__prev-year" data-action="prev-year">‹‹</button>
      <button class="jt-date-picker__prev-btn jt-date-picker__prev-month" data-action="prev-month">‹</button>
      <span class="jt-date-picker__header-label">
        <button class="jt-date-picker__year-btn" data-action="year-panel">${year}年</button>
        <button class="jt-date-picker__month-btn" data-action="month-panel">${month + 1}月</button>
      </span>
      <button class="jt-date-picker__next-btn jt-date-picker__next-month" data-action="next-month">›</button>
      <button class="jt-date-picker__next-btn jt-date-picker__next-year" data-action="next-year">››</button>
    </div>`;
            // 星期标题
            html += '<div class="jt-date-picker__week-header">';
            const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
            const { firstDayOfWeek } = this.props;
            for (let i = 0; i < 7; i++) {
                const dayIndex = (firstDayOfWeek + i) % 7;
                html += `<span class="jt-date-picker__week-day">${weekDays[dayIndex]}</span>`;
            }
            html += '</div>';
            // 日期网格
            html += '<div class="jt-date-picker__date-grid">';
            const firstDay = new Date(year, month, 1);
            const startDate = new Date(firstDay);
            startDate.setDate(startDate.getDate() - ((firstDay.getDay() - firstDayOfWeek + 7) % 7));
            for (let i = 0; i < 42; i++) {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + i);
                const isCurrentMonth = currentDate.getMonth() === month;
                const isToday = this.isSameDay(currentDate, new Date());
                const isSelected = this.isDateSelected(currentDate);
                const isDisabled = this.props.disabledDate ? this.props.disabledDate(currentDate) : false;
                const isInRange = this.isDateInRange(currentDate);
                const classes = [
                    'jt-date-picker__date-cell',
                    !isCurrentMonth ? 'jt-date-picker__date-cell--prev-month' : '',
                    isToday ? 'jt-date-picker__date-cell--today' : '',
                    isSelected ? 'jt-date-picker__date-cell--selected' : '',
                    isDisabled ? 'jt-date-picker__date-cell--disabled' : '',
                    isInRange ? 'jt-date-picker__date-cell--in-range' : ''
                ].filter(Boolean).join(' ');
                html += `<span class="${classes}" data-date="${currentDate.toISOString()}">${currentDate.getDate()}</span>`;
            }
            html += '</div>';
            html += '</div>';
            return html;
        }
        renderDateTimePanel() {
            return this.renderDatePanel() + this.renderTimePanel();
        }
        renderTimePanel() {
            const time = this._value instanceof Date ? this._value : new Date();
            const hours = time.getHours();
            const minutes = time.getMinutes();
            const seconds = time.getSeconds();
            let html = '<div class="jt-date-picker__time-panel">';
            // 时间选择器
            html += '<div class="jt-date-picker__time-spinner">';
            // 小时
            html += '<div class="jt-date-picker__time-column">';
            html += '<div class="jt-date-picker__time-header">时</div>';
            html += '<div class="jt-date-picker__time-list">';
            for (let i = 0; i < 24; i++) {
                const isSelected = i === hours;
                html += `<div class="jt-date-picker__time-item ${isSelected ? 'is-selected' : ''}" data-type="hour" data-value="${i}">${String(i).padStart(2, '0')}</div>`;
            }
            html += '</div></div>';
            // 分钟
            html += '<div class="jt-date-picker__time-column">';
            html += '<div class="jt-date-picker__time-header">分</div>';
            html += '<div class="jt-date-picker__time-list">';
            for (let i = 0; i < 60; i++) {
                const isSelected = i === minutes;
                html += `<div class="jt-date-picker__time-item ${isSelected ? 'is-selected' : ''}" data-type="minute" data-value="${i}">${String(i).padStart(2, '0')}</div>`;
            }
            html += '</div></div>';
            // 秒
            html += '<div class="jt-date-picker__time-column">';
            html += '<div class="jt-date-picker__time-header">秒</div>';
            html += '<div class="jt-date-picker__time-list">';
            for (let i = 0; i < 60; i++) {
                const isSelected = i === seconds;
                html += `<div class="jt-date-picker__time-item ${isSelected ? 'is-selected' : ''}" data-type="second" data-value="${i}">${String(i).padStart(2, '0')}</div>`;
            }
            html += '</div></div>';
            html += '</div>';
            html += '</div>';
            return html;
        }
        renderWeekPanel() {
            // 周选择器实现
            return '<div class="jt-date-picker__week-panel">周选择器</div>';
        }
        renderMonthPanel() {
            const year = this.viewDate.getFullYear();
            let html = '<div class="jt-date-picker__month-panel">';
            // 头部导航
            html += `<div class="jt-date-picker__header">
      <button class="jt-date-picker__prev-btn" data-action="prev-year">‹</button>
      <span class="jt-date-picker__header-label">${year}年</span>
      <button class="jt-date-picker__next-btn" data-action="next-year">›</button>
    </div>`;
            // 月份网格
            html += '<div class="jt-date-picker__month-grid">';
            const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
            months.forEach((monthName, index) => {
                const isSelected = this._value instanceof Date &&
                    this._value.getFullYear() === year &&
                    this._value.getMonth() === index;
                html += `<span class="jt-date-picker__month-cell ${isSelected ? 'is-selected' : ''}" data-month="${index}">${monthName}</span>`;
            });
            html += '</div>';
            html += '</div>';
            return html;
        }
        renderYearPanel() {
            const currentYear = this.viewDate.getFullYear();
            const startYear = Math.floor(currentYear / 10) * 10;
            let html = '<div class="jt-date-picker__year-panel">';
            // 头部导航
            html += `<div class="jt-date-picker__header">
      <button class="jt-date-picker__prev-btn" data-action="prev-decade">‹</button>
      <span class="jt-date-picker__header-label">${startYear} - ${startYear + 9}</span>
      <button class="jt-date-picker__next-btn" data-action="next-decade">›</button>
    </div>`;
            // 年份网格
            html += '<div class="jt-date-picker__year-grid">';
            for (let i = 0; i < 10; i++) {
                const year = startYear + i;
                const isSelected = this._value instanceof Date && this._value.getFullYear() === year;
                html += `<span class="jt-date-picker__year-cell ${isSelected ? 'is-selected' : ''}" data-year="${year}">${year}</span>`;
            }
            html += '</div>';
            html += '</div>';
            return html;
        }
        isSameDay(date1, date2) {
            return date1.getFullYear() === date2.getFullYear() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getDate() === date2.getDate();
        }
        isDateSelected(date) {
            if (!this._value)
                return false;
            if (this.isRange && Array.isArray(this._value)) {
                return this._value.some(d => d && this.isSameDay(date, d));
            }
            else if (this._value instanceof Date) {
                return this.isSameDay(date, this._value);
            }
            return false;
        }
        isDateInRange(date) {
            if (!this.isRange || !Array.isArray(this._value) || this._value.length !== 2) {
                return false;
            }
            const [start, end] = this._value;
            if (!start || !end)
                return false;
            return date >= start && date <= end;
        }
        bindEvents() {
            // 输入框点击事件
            this.addEventListener('click', (e) => {
                if (this.props.disabled)
                    return;
                const target = e.target;
                if (target.getAttribute('data-action') === 'clear') {
                    this.clearValue();
                    return;
                }
                if (target.classList.contains('jt-date-picker__input') ||
                    target.classList.contains('jt-date-picker__prefix-icon') ||
                    target.classList.contains('jt-date-picker__caret')) {
                    this.togglePanel();
                }
                // 面板内的点击事件
                this.handlePanelClick(e);
            });
            // 点击外部关闭
            document.addEventListener('click', (e) => {
                if (!this.contains(e.target)) {
                    this.closePanel();
                }
            });
        }
        handlePanelClick(e) {
            const target = e.target;
            const action = target.getAttribute('data-action');
            switch (action) {
                case 'prev-year':
                    this.viewDate.setFullYear(this.viewDate.getFullYear() - 1);
                    this.render();
                    break;
                case 'next-year':
                    this.viewDate.setFullYear(this.viewDate.getFullYear() + 1);
                    this.render();
                    break;
                case 'prev-month':
                    this.viewDate.setMonth(this.viewDate.getMonth() - 1);
                    this.render();
                    break;
                case 'next-month':
                    this.viewDate.setMonth(this.viewDate.getMonth() + 1);
                    this.render();
                    break;
            }
            // 日期选择
            if (target.classList.contains('jt-date-picker__date-cell') &&
                !target.classList.contains('jt-date-picker__date-cell--disabled')) {
                const dateStr = target.getAttribute('data-date');
                if (dateStr) {
                    this.selectDate(new Date(dateStr));
                }
            }
            // 时间选择
            if (target.classList.contains('jt-date-picker__time-item')) {
                const type = target.getAttribute('data-type');
                const value = parseInt(target.getAttribute('data-value') || '0');
                this.selectTime(type, value);
            }
        }
        selectDate(date) {
            if (this.isRange) {
                if (!this.rangeStart || this.rangeEnd) {
                    this.rangeStart = date;
                    this.rangeEnd = null;
                }
                else {
                    this.rangeEnd = date;
                    if (this.rangeStart > this.rangeEnd) {
                        [this.rangeStart, this.rangeEnd] = [this.rangeEnd, this.rangeStart];
                    }
                    this._value = [this.rangeStart, this.rangeEnd];
                    this.emitChange();
                    this.closePanel();
                }
            }
            else {
                this._value = date;
                this.emitChange();
                if (this.props.type === 'date') {
                    this.closePanel();
                }
            }
            this.render();
        }
        selectTime(type, value) {
            const date = this._value instanceof Date ? new Date(this._value) : new Date();
            switch (type) {
                case 'hour':
                    date.setHours(value);
                    break;
                case 'minute':
                    date.setMinutes(value);
                    break;
                case 'second':
                    date.setSeconds(value);
                    break;
            }
            this._value = date;
            this.emitChange();
            this.render();
        }
        togglePanel() {
            if (this.isOpen) {
                this.closePanel();
            }
            else {
                this.openPanel();
            }
        }
        openPanel() {
            this.isOpen = true;
            this.render();
        }
        closePanel() {
            this.isOpen = false;
            this.rangeStart = null;
            this.rangeEnd = null;
            this.render();
        }
        clearValue() {
            this._value = null;
            this.removeAttribute('value');
            this.emitChange();
            this.render();
        }
        emitChange() {
            this.dispatchEvent(new CustomEvent('change', {
                detail: { value: this._value },
                bubbles: true
            }));
        }
        getStyles() {
            return `
      :host {
        display: inline-block;
        width: 100%;
      }

      .jt-date-picker {
        position: relative;
        display: inline-block;
        width: 100%;
        font-size: var(--jt-font-size-base);
      }

      .jt-date-picker__editor {
        position: relative;
        display: inline-flex;
        align-items: center;
        width: 100%;
        height: var(--jt-component-size-default);
        padding: 0 8px;
        background-color: var(--jt-fill-color-blank);
        border: 1px solid var(--jt-border-color);
        border-radius: var(--jt-border-radius-base);
        cursor: pointer;
        transition: var(--jt-transition-border);
      }

      .jt-date-picker__editor:hover {
        border-color: var(--jt-color-primary-light-5);
      }

      .jt-date-picker.is-focus .jt-date-picker__editor {
        border-color: var(--jt-color-primary);
      }

      .jt-date-picker.is-disabled .jt-date-picker__editor {
        background-color: var(--jt-fill-color-light);
        border-color: var(--jt-border-color-lighter);
        cursor: not-allowed;
      }

      .jt-date-picker__prefix-icon {
        margin-right: 8px;
        color: var(--jt-color-text-placeholder);
      }

      .jt-date-picker__input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        color: var(--jt-color-text-regular);
        font-size: inherit;
        cursor: inherit;
      }

      .jt-date-picker__input::placeholder {
        color: var(--jt-color-text-placeholder);
      }

      .jt-date-picker__range-separator {
        padding: 0 8px;
        color: var(--jt-color-text-placeholder);
      }

      .jt-date-picker__suffix-icon {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-left: 8px;
        color: var(--jt-color-text-placeholder);
      }

      .jt-date-picker__clear-icon,
      .jt-date-picker__caret {
        cursor: pointer;
        transition: var(--jt-transition-color);
      }

      .jt-date-picker__clear-icon:hover {
        color: var(--jt-color-text-regular);
      }

      .jt-date-picker__caret {
        transition: var(--jt-transition-all);
      }

      .jt-date-picker__caret.is-reverse {
        transform: rotate(180deg);
      }

      .jt-date-picker__panel {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: var(--jt-index-popper);
        background: var(--jt-fill-color-blank);
        border: 1px solid var(--jt-border-color-light);
        border-radius: var(--jt-border-radius-base);
        box-shadow: var(--jt-box-shadow-light);
        margin-top: 4px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: var(--jt-transition-all);
      }

      .jt-date-picker__panel.is-visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .jt-date-picker__shortcuts {
        border-right: 1px solid var(--jt-border-color-lighter);
        padding: 8px;
        width: 120px;
      }

      .jt-date-picker__shortcut {
        display: block;
        width: 100%;
        padding: 8px 12px;
        margin-bottom: 4px;
        border: none;
        background: none;
        text-align: left;
        cursor: pointer;
        border-radius: var(--jt-border-radius-small);
        transition: var(--jt-transition-all);
      }

      .jt-date-picker__shortcut:hover {
        background-color: var(--jt-fill-color-light);
      }

      .jt-date-picker__content {
        padding: 8px;
        min-width: 280px;
      }

      .jt-date-picker__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
        padding: 0 4px;
      }

      .jt-date-picker__header-label {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .jt-date-picker__year-btn,
      .jt-date-picker__month-btn {
        border: none;
        background: none;
        cursor: pointer;
        font-weight: 500;
        color: var(--jt-color-text-primary);
        transition: var(--jt-transition-color);
      }

      .jt-date-picker__year-btn:hover,
      .jt-date-picker__month-btn:hover {
        color: var(--jt-color-primary);
      }

      .jt-date-picker__prev-btn,
      .jt-date-picker__next-btn {
        border: none;
        background: none;
        cursor: pointer;
        padding: 4px;
        color: var(--jt-color-text-placeholder);
        transition: var(--jt-transition-color);
      }

      .jt-date-picker__prev-btn:hover,
      .jt-date-picker__next-btn:hover {
        color: var(--jt-color-primary);
      }

      .jt-date-picker__week-header {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1px;
        margin-bottom: 4px;
      }

      .jt-date-picker__week-day {
        text-align: center;
        padding: 8px 0;
        font-size: var(--jt-font-size-small);
        color: var(--jt-color-text-secondary);
        font-weight: 500;
      }

      .jt-date-picker__date-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1px;
      }

      .jt-date-picker__date-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        cursor: pointer;
        border-radius: var(--jt-border-radius-small);
        transition: var(--jt-transition-all);
      }

      .jt-date-picker__date-cell:hover {
        background-color: var(--jt-fill-color-light);
      }

      .jt-date-picker__date-cell--prev-month {
        color: var(--jt-color-text-placeholder);
      }

      .jt-date-picker__date-cell--today {
        color: var(--jt-color-primary);
        font-weight: 500;
      }

      .jt-date-picker__date-cell--selected {
        background-color: var(--jt-color-primary);
        color: white;
      }

      .jt-date-picker__date-cell--disabled {
        color: var(--jt-color-text-disabled);
        cursor: not-allowed;
      }

      .jt-date-picker__date-cell--disabled:hover {
        background-color: transparent;
      }

      .jt-date-picker__date-cell--in-range {
        background-color: var(--jt-color-primary-light-9);
      }

      .jt-date-picker__time-panel {
        border-top: 1px solid var(--jt-border-color-lighter);
        padding-top: 8px;
        margin-top: 8px;
      }

      .jt-date-picker__time-spinner {
        display: flex;
        gap: 8px;
      }

      .jt-date-picker__time-column {
        flex: 1;
      }

      .jt-date-picker__time-header {
        text-align: center;
        padding: 4px 0;
        font-size: var(--jt-font-size-small);
        color: var(--jt-color-text-secondary);
        border-bottom: 1px solid var(--jt-border-color-lighter);
        margin-bottom: 4px;
      }

      .jt-date-picker__time-list {
        max-height: 120px;
        overflow-y: auto;
      }

      .jt-date-picker__time-item {
        text-align: center;
        padding: 4px 0;
        cursor: pointer;
        transition: var(--jt-transition-all);
      }

      .jt-date-picker__time-item:hover {
        background-color: var(--jt-fill-color-light);
      }

      .jt-date-picker__time-item.is-selected {
        background-color: var(--jt-color-primary);
        color: white;
      }

      .jt-date-picker__month-grid,
      .jt-date-picker__year-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
      }

      .jt-date-picker__month-cell,
      .jt-date-picker__year-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 48px;
        cursor: pointer;
        border-radius: var(--jt-border-radius-base);
        transition: var(--jt-transition-all);
      }

      .jt-date-picker__month-cell:hover,
      .jt-date-picker__year-cell:hover {
        background-color: var(--jt-fill-color-light);
      }

      .jt-date-picker__month-cell.is-selected,
      .jt-date-picker__year-cell.is-selected {
        background-color: var(--jt-color-primary);
        color: white;
      }

      /* 大小变体 */
      .jt-date-picker--large .jt-date-picker__editor {
        height: var(--jt-component-size-large);
        font-size: var(--jt-font-size-large);
      }

      .jt-date-picker--small .jt-date-picker__editor {
        height: var(--jt-component-size-small);
        font-size: var(--jt-font-size-small);
      }

      .jt-date-picker--mini .jt-date-picker__editor {
        height: 20px;
        font-size: var(--jt-font-size-extra-small);
      }
    `;
        }
        // 静态方法用于注册组件
        static register() {
            if (!customElements.get('jt-date-picker')) {
                customElements.define('jt-date-picker', JTDatePicker);
            }
        }
    }
    // 自动注册组件
    JTDatePicker.register();

    /**
     * 巨天UI - 工具函数库
     * 提供常用的工具函数和辅助方法
     */
    // DOM 操作工具
    const dom = {
        /**
         * 添加CSS类名
         */
        addClass(el, className) {
            if (el.classList) {
                el.classList.add(className);
            }
            else {
                el.className += ' ' + className;
            }
        },
        /**
         * 移除CSS类名
         */
        removeClass(el, className) {
            if (el.classList) {
                el.classList.remove(className);
            }
            else {
                el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        },
        /**
         * 切换CSS类名
         */
        toggleClass(el, className) {
            if (el.classList) {
                el.classList.toggle(className);
            }
            else {
                if (this.hasClass(el, className)) {
                    this.removeClass(el, className);
                }
                else {
                    this.addClass(el, className);
                }
            }
        },
        /**
         * 检查是否包含CSS类名
         */
        hasClass(el, className) {
            if (el.classList) {
                return el.classList.contains(className);
            }
            else {
                return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
            }
        },
        /**
         * 获取元素的位置和尺寸
         */
        getRect(el) {
            return el.getBoundingClientRect();
        },
        /**
         * 获取元素相对于文档的偏移
         */
        getOffset(el) {
            const rect = el.getBoundingClientRect();
            return {
                top: rect.top + window.pageYOffset,
                left: rect.left + window.pageXOffset
            };
        }
    };
    // 事件工具
    const event = {
        /**
         * 添加事件监听器
         */
        on(el, event, handler, options) {
            el.addEventListener(event, handler, options);
        },
        /**
         * 移除事件监听器
         */
        off(el, event, handler, options) {
            el.removeEventListener(event, handler, options);
        },
        /**
         * 触发自定义事件
         */
        trigger(el, eventName, detail) {
            const event = new CustomEvent(eventName, {
                detail,
                bubbles: true,
                cancelable: true
            });
            el.dispatchEvent(event);
        },
        /**
         * 阻止事件冒泡和默认行为
         */
        stop(e) {
            e.preventDefault();
            e.stopPropagation();
        }
    };
    // 类型检查工具
    const type = {
        /**
         * 检查是否为字符串
         */
        isString(val) {
            return typeof val === 'string';
        },
        /**
         * 检查是否为数字
         */
        isNumber(val) {
            return typeof val === 'number' && !isNaN(val);
        },
        /**
         * 检查是否为布尔值
         */
        isBoolean(val) {
            return typeof val === 'boolean';
        },
        /**
         * 检查是否为函数
         */
        isFunction(val) {
            return typeof val === 'function';
        },
        /**
         * 检查是否为对象
         */
        isObject(val) {
            return val !== null && typeof val === 'object';
        },
        /**
         * 检查是否为数组
         */
        isArray(val) {
            return Array.isArray(val);
        },
        /**
         * 检查是否为undefined
         */
        isUndefined(val) {
            return typeof val === 'undefined';
        },
        /**
         * 检查是否为null
         */
        isNull(val) {
            return val === null;
        },
        /**
         * 检查是否为空值（null或undefined）
         */
        isNil(val) {
            return val == null;
        }
    };
    // 字符串工具
    const string = {
        /**
         * 首字母大写
         */
        capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        /**
         * 驼峰命名转换
         */
        camelCase(str) {
            return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        },
        /**
         * 短横线命名转换
         */
        kebabCase(str) {
            return str.replace(/([A-Z])/g, '-$1').toLowerCase();
        },
        /**
         * 截断字符串
         */
        truncate(str, length, suffix = '...') {
            if (str.length <= length)
                return str;
            return str.slice(0, length) + suffix;
        },
        /**
         * 生成随机字符串
         */
        random(length = 8) {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        }
    };
    // 数组工具
    const array = {
        /**
         * 数组去重
         */
        unique(arr) {
            return [...new Set(arr)];
        },
        /**
         * 数组分块
         */
        chunk(arr, size) {
            const chunks = [];
            for (let i = 0; i < arr.length; i += size) {
                chunks.push(arr.slice(i, i + size));
            }
            return chunks;
        },
        /**
         * 数组扁平化
         */
        flatten(arr) {
            return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(this.flatten(val)) : acc.concat(val), []);
        },
        /**
         * 数组随机排序
         */
        shuffle(arr) {
            const result = [...arr];
            for (let i = result.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [result[i], result[j]] = [result[j], result[i]];
            }
            return result;
        }
    };
    // 对象工具
    const object = {
        /**
         * 深拷贝
         */
        deepClone(obj) {
            if (obj === null || typeof obj !== 'object')
                return obj;
            if (obj instanceof Date)
                return new Date(obj.getTime());
            if (obj instanceof Array)
                return obj.map(item => this.deepClone(item));
            if (typeof obj === 'object') {
                const clonedObj = {};
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        clonedObj[key] = this.deepClone(obj[key]);
                    }
                }
                return clonedObj;
            }
            return obj;
        },
        /**
         * 对象合并
         */
        merge(target, ...sources) {
            if (!sources.length)
                return target;
            const source = sources.shift();
            if (this.isObject(target) && this.isObject(source)) {
                for (const key in source) {
                    if (this.isObject(source[key])) {
                        if (!target[key])
                            Object.assign(target, { [key]: {} });
                        this.merge(target[key], source[key]);
                    }
                    else {
                        Object.assign(target, { [key]: source[key] });
                    }
                }
            }
            return this.merge(target, ...sources);
        },
        /**
         * 检查是否为对象
         */
        isObject(item) {
            return item && typeof item === 'object' && !Array.isArray(item);
        }
    };
    // 日期工具
    const date = {
        /**
         * 格式化日期
         */
        format(date, format = 'YYYY-MM-DD') {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return format
                .replace('YYYY', String(year))
                .replace('MM', month)
                .replace('DD', day)
                .replace('HH', hours)
                .replace('mm', minutes)
                .replace('ss', seconds);
        },
        /**
         * 解析日期字符串
         */
        parse(dateString) {
            return new Date(dateString);
        },
        /**
         * 获取相对时间
         */
        relative(date) {
            const now = new Date();
            const diff = now.getTime() - date.getTime();
            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            if (days > 0)
                return `${days}天前`;
            if (hours > 0)
                return `${hours}小时前`;
            if (minutes > 0)
                return `${minutes}分钟前`;
            return '刚刚';
        }
    };
    // 性能工具
    const performance$1 = {
        /**
         * 防抖函数
         */
        debounce(func, wait) {
            let timeout;
            return ((...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            });
        },
        /**
         * 节流函数
         */
        throttle(func, limit) {
            let inThrottle;
            return ((...args) => {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            });
        },
        /**
         * 请求动画帧
         */
        raf(callback) {
            return requestAnimationFrame(callback);
        },
        /**
         * 取消动画帧
         */
        cancelRaf(id) {
            cancelAnimationFrame(id);
        }
    };
    // 验证工具
    const validate = {
        /**
         * 验证邮箱
         */
        email(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
        /**
         * 验证手机号
         */
        phone(phone) {
            const re = /^1[3-9]\d{9}$/;
            return re.test(phone);
        },
        /**
         * 验证URL
         */
        url(url) {
            try {
                new URL(url);
                return true;
            }
            catch {
                return false;
            }
        },
        /**
         * 验证身份证号
         */
        idCard(idCard) {
            const re = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            return re.test(idCard);
        }
    };
    // 存储工具
    const storage = {
        /**
         * localStorage 操作
         */
        local: {
            set(key, value) {
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                }
                catch (e) {
                    console.error('localStorage set error:', e);
                }
            },
            get(key, defaultValue) {
                try {
                    const item = localStorage.getItem(key);
                    return item ? JSON.parse(item) : defaultValue || null;
                }
                catch (e) {
                    console.error('localStorage get error:', e);
                    return defaultValue || null;
                }
            },
            remove(key) {
                try {
                    localStorage.removeItem(key);
                }
                catch (e) {
                    console.error('localStorage remove error:', e);
                }
            },
            clear() {
                try {
                    localStorage.clear();
                }
                catch (e) {
                    console.error('localStorage clear error:', e);
                }
            }
        },
        /**
         * sessionStorage 操作
         */
        session: {
            set(key, value) {
                try {
                    sessionStorage.setItem(key, JSON.stringify(value));
                }
                catch (e) {
                    console.error('sessionStorage set error:', e);
                }
            },
            get(key, defaultValue) {
                try {
                    const item = sessionStorage.getItem(key);
                    return item ? JSON.parse(item) : defaultValue || null;
                }
                catch (e) {
                    console.error('sessionStorage get error:', e);
                    return defaultValue || null;
                }
            },
            remove(key) {
                try {
                    sessionStorage.removeItem(key);
                }
                catch (e) {
                    console.error('sessionStorage remove error:', e);
                }
            },
            clear() {
                try {
                    sessionStorage.clear();
                }
                catch (e) {
                    console.error('sessionStorage clear error:', e);
                }
            }
        }
    };
    // 导出所有工具
    var index = {
        dom,
        event,
        type,
        string,
        array,
        object,
        date,
        performance: performance$1,
        validate,
        storage
    };

    var utils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        array: array,
        date: date,
        default: index,
        dom: dom,
        event: event,
        object: object,
        performance: performance$1,
        storage: storage,
        string: string,
        type: type,
        validate: validate
    });

    /**
     * 巨天UI - 高级工具函数库
     * 提供更多专业的工具函数和辅助方法
     */
    // 数据处理工具
    const data = {
        /**
         * 深度合并对象
         */
        deepMerge(target, ...sources) {
            if (!sources.length)
                return target;
            const source = sources.shift();
            if (this.isObject(target) && this.isObject(source)) {
                for (const key in source) {
                    if (this.isObject(source[key])) {
                        if (!target[key])
                            Object.assign(target, { [key]: {} });
                        this.deepMerge(target[key], source[key]);
                    }
                    else {
                        Object.assign(target, { [key]: source[key] });
                    }
                }
            }
            return this.deepMerge(target, ...sources);
        },
        /**
         * 检查是否为对象
         */
        isObject(item) {
            return item && typeof item === 'object' && !Array.isArray(item);
        },
        /**
         * 数据分组
         */
        groupBy(array, key) {
            return array.reduce((groups, item) => {
                const groupKey = typeof key === 'function' ? key(item) : String(item[key]);
                if (!groups[groupKey]) {
                    groups[groupKey] = [];
                }
                groups[groupKey].push(item);
                return groups;
            }, {});
        },
        /**
         * 数据排序
         */
        sortBy(array, key, order = 'asc') {
            return [...array].sort((a, b) => {
                const aVal = typeof key === 'function' ? key(a) : a[key];
                const bVal = typeof key === 'function' ? key(b) : b[key];
                if (aVal < bVal)
                    return order === 'asc' ? -1 : 1;
                if (aVal > bVal)
                    return order === 'asc' ? 1 : -1;
                return 0;
            });
        },
        /**
         * 数据过滤
         */
        filterBy(array, filters) {
            return array.filter(item => {
                return Object.entries(filters).every(([key, value]) => {
                    if (Array.isArray(value)) {
                        return value.includes(item[key]);
                    }
                    return item[key] === value;
                });
            });
        },
        /**
         * 数据分页
         */
        paginate(array, page, pageSize) {
            const total = array.length;
            const totalPages = Math.ceil(total / pageSize);
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            const data = array.slice(start, end);
            return { data, total, totalPages };
        },
        /**
         * 数据搜索
         */
        search(array, query, fields) {
            const lowerQuery = query.toLowerCase();
            return array.filter(item => {
                return fields.some(field => {
                    const value = String(item[field]).toLowerCase();
                    return value.includes(lowerQuery);
                });
            });
        },
        /**
         * 数据统计
         */
        statistics(array, field) {
            const values = array.map(item => Number(item[field])).filter(val => !isNaN(val));
            const count = values.length;
            const sum = values.reduce((acc, val) => acc + val, 0);
            const avg = count > 0 ? sum / count : 0;
            const min = count > 0 ? Math.min(...values) : 0;
            const max = count > 0 ? Math.max(...values) : 0;
            return { count, sum, avg, min, max };
        }
    };
    // 文件处理工具
    const file = {
        /**
         * 读取文件为Base64
         */
        readAsBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        },
        /**
         * 读取文件为文本
         */
        readAsText(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsText(file);
            });
        },
        /**
         * 下载文件
         */
        download(data, filename, type) {
            const blob = typeof data === 'string' ? new Blob([data], { type: type || 'text/plain' }) : data;
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        },
        /**
         * 获取文件扩展名
         */
        getExtension(filename) {
            return filename.split('.').pop()?.toLowerCase() || '';
        },
        /**
         * 格式化文件大小
         */
        formatSize(bytes) {
            if (bytes === 0)
                return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },
        /**
         * 检查文件类型
         */
        isImage(file) {
            return file.type.startsWith('image/');
        },
        isVideo(file) {
            return file.type.startsWith('video/');
        },
        isAudio(file) {
            return file.type.startsWith('audio/');
        },
        isPDF(file) {
            return file.type === 'application/pdf';
        },
        /**
         * 压缩图片
         */
        compressImage(file, quality = 0.8, maxWidth = 1920) {
            return new Promise((resolve) => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();
                img.onload = () => {
                    const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
                    canvas.width = img.width * ratio;
                    canvas.height = img.height * ratio;
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    canvas.toBlob(resolve, 'image/jpeg', quality);
                };
                img.src = URL.createObjectURL(file);
            });
        }
    };
    // 网络请求工具
    const http = {
        /**
         * GET请求
         */
        async get(url, options) {
            const response = await fetch(url, { method: 'GET', ...options });
            if (!response.ok)
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            return response.json();
        },
        /**
         * POST请求
         */
        async post(url, data, options) {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...options?.headers },
                body: data ? JSON.stringify(data) : undefined,
                ...options
            });
            if (!response.ok)
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            return response.json();
        },
        /**
         * PUT请求
         */
        async put(url, data, options) {
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...options?.headers },
                body: data ? JSON.stringify(data) : undefined,
                ...options
            });
            if (!response.ok)
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            return response.json();
        },
        /**
         * DELETE请求
         */
        async delete(url, options) {
            const response = await fetch(url, { method: 'DELETE', ...options });
            if (!response.ok)
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            return response.json();
        },
        /**
         * 上传文件
         */
        async upload(url, file, options) {
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                ...options
            });
            if (!response.ok)
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            return response.json();
        },
        /**
         * 请求拦截器
         */
        interceptors: {
            request: [],
            response: []
        },
        /**
         * 添加请求拦截器
         */
        addRequestInterceptor(interceptor) {
            this.interceptors.request.push(interceptor);
        },
        /**
         * 添加响应拦截器
         */
        addResponseInterceptor(interceptor) {
            this.interceptors.response.push(interceptor);
        }
    };
    // 图像处理工具
    const image = {
        /**
         * 获取图片信息
         */
        getImageInfo(file) {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    resolve({
                        width: img.width,
                        height: img.height,
                        size: file.size,
                        type: file.type
                    });
                };
                img.src = URL.createObjectURL(file);
            });
        },
        /**
         * 裁剪图片
         */
        cropImage(file, x, y, width, height) {
            return new Promise((resolve) => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();
                img.onload = () => {
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
                    canvas.toBlob(resolve, 'image/jpeg', 0.9);
                };
                img.src = URL.createObjectURL(file);
            });
        },
        /**
         * 旋转图片
         */
        rotateImage(file, angle) {
            return new Promise((resolve) => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();
                img.onload = () => {
                    const rad = (angle * Math.PI) / 180;
                    const sin = Math.abs(Math.sin(rad));
                    const cos = Math.abs(Math.cos(rad));
                    canvas.width = img.width * cos + img.height * sin;
                    canvas.height = img.width * sin + img.height * cos;
                    ctx.translate(canvas.width / 2, canvas.height / 2);
                    ctx.rotate(rad);
                    ctx.drawImage(img, -img.width / 2, -img.height / 2);
                    canvas.toBlob(resolve, 'image/jpeg', 0.9);
                };
                img.src = URL.createObjectURL(file);
            });
        },
        /**
         * 添加水印
         */
        addWatermark(file, watermarkText, options = {}) {
            return new Promise((resolve) => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();
                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    // 设置水印样式
                    const fontSize = options.fontSize || 20;
                    const color = options.color || 'rgba(255, 255, 255, 0.8)';
                    const opacity = options.opacity || 0.8;
                    ctx.font = `${fontSize}px Arial`;
                    ctx.fillStyle = color;
                    ctx.globalAlpha = opacity;
                    // 计算水印位置
                    const textMetrics = ctx.measureText(watermarkText);
                    let x = 10, y = fontSize + 10;
                    switch (options.position) {
                        case 'top-right':
                            x = canvas.width - textMetrics.width - 10;
                            y = fontSize + 10;
                            break;
                        case 'bottom-left':
                            x = 10;
                            y = canvas.height - 10;
                            break;
                        case 'bottom-right':
                            x = canvas.width - textMetrics.width - 10;
                            y = canvas.height - 10;
                            break;
                        case 'center':
                            x = (canvas.width - textMetrics.width) / 2;
                            y = canvas.height / 2;
                            break;
                    }
                    ctx.fillText(watermarkText, x, y);
                    canvas.toBlob(resolve, 'image/jpeg', 0.9);
                };
                img.src = URL.createObjectURL(file);
            });
        }
    };
    // 动画工具
    const animation = {
        /**
         * 缓动函数
         */
        easing: {
            linear: (t) => t,
            easeInQuad: (t) => t * t,
            easeOutQuad: (t) => t * (2 - t),
            easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
            easeInCubic: (t) => t * t * t,
            easeOutCubic: (t) => (--t) * t * t + 1,
            easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
            easeInQuart: (t) => t * t * t * t,
            easeOutQuart: (t) => 1 - (--t) * t * t * t,
            easeInOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
            easeInQuint: (t) => t * t * t * t * t,
            easeOutQuint: (t) => 1 + (--t) * t * t * t * t,
            easeInOutQuint: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
        },
        /**
         * 动画函数
         */
        animate(from, to, duration, easing = this.easing.linear, onUpdate, onComplete) {
            const startTime = performance.now();
            const change = to - from;
            let animationId;
            const step = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easing(progress);
                const currentValue = from + change * easedProgress;
                onUpdate(currentValue);
                if (progress < 1) {
                    animationId = requestAnimationFrame(step);
                }
                else {
                    onComplete?.();
                }
            };
            animationId = requestAnimationFrame(step);
            // 返回取消函数
            return () => cancelAnimationFrame(animationId);
        },
        /**
         * 滚动动画
         */
        scrollTo(element, to, duration = 300, easing = this.easing.easeOutQuad) {
            return new Promise((resolve) => {
                const from = element.scrollTop;
                this.animate(from, to, duration, easing, (value) => {
                    element.scrollTop = value;
                }, resolve);
            });
        },
        /**
         * 淡入动画
         */
        fadeIn(element, duration = 300) {
            return new Promise((resolve) => {
                element.style.opacity = '0';
                element.style.display = 'block';
                this.animate(0, 1, duration, this.easing.easeOutQuad, (value) => {
                    element.style.opacity = String(value);
                }, resolve);
            });
        },
        /**
         * 淡出动画
         */
        fadeOut(element, duration = 300) {
            return new Promise((resolve) => {
                this.animate(1, 0, duration, this.easing.easeOutQuad, (value) => {
                    element.style.opacity = String(value);
                }, () => {
                    element.style.display = 'none';
                    resolve();
                });
            });
        },
        /**
         * 滑动显示
         */
        slideDown(element, duration = 300) {
            return new Promise((resolve) => {
                const height = element.scrollHeight;
                element.style.height = '0px';
                element.style.overflow = 'hidden';
                element.style.display = 'block';
                this.animate(0, height, duration, this.easing.easeOutQuad, (value) => {
                    element.style.height = `${value}px`;
                }, () => {
                    element.style.height = '';
                    element.style.overflow = '';
                    resolve();
                });
            });
        },
        /**
         * 滑动隐藏
         */
        slideUp(element, duration = 300) {
            return new Promise((resolve) => {
                const height = element.scrollHeight;
                element.style.height = `${height}px`;
                element.style.overflow = 'hidden';
                this.animate(height, 0, duration, this.easing.easeOutQuad, (value) => {
                    element.style.height = `${value}px`;
                }, () => {
                    element.style.display = 'none';
                    element.style.height = '';
                    element.style.overflow = '';
                    resolve();
                });
            });
        }
    };
    // 颜色工具
    const color = {
        /**
         * HEX转RGB
         */
        hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        },
        /**
         * RGB转HEX
         */
        rgbToHex(r, g, b) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        },
        /**
         * HSL转RGB
         */
        hslToRgb(h, s, l) {
            h /= 360;
            s /= 100;
            l /= 100;
            const hue2rgb = (p, q, t) => {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if (t < 1 / 2)
                    return q;
                if (t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            let r, g, b;
            if (s === 0) {
                r = g = b = l;
            }
            else {
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }
            return {
                r: Math.round(r * 255),
                g: Math.round(g * 255),
                b: Math.round(b * 255)
            };
        },
        /**
         * 生成随机颜色
         */
        random() {
            return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        },
        /**
         * 颜色变亮
         */
        lighten(color, amount) {
            const rgb = this.hexToRgb(color);
            if (!rgb)
                return color;
            const { r, g, b } = rgb;
            const newR = Math.min(255, Math.round(r + (255 - r) * amount));
            const newG = Math.min(255, Math.round(g + (255 - g) * amount));
            const newB = Math.min(255, Math.round(b + (255 - b) * amount));
            return this.rgbToHex(newR, newG, newB);
        },
        /**
         * 颜色变暗
         */
        darken(color, amount) {
            const rgb = this.hexToRgb(color);
            if (!rgb)
                return color;
            const { r, g, b } = rgb;
            const newR = Math.max(0, Math.round(r * (1 - amount)));
            const newG = Math.max(0, Math.round(g * (1 - amount)));
            const newB = Math.max(0, Math.round(b * (1 - amount)));
            return this.rgbToHex(newR, newG, newB);
        },
        /**
         * 获取对比色
         */
        getContrast(color) {
            const rgb = this.hexToRgb(color);
            if (!rgb)
                return '#000000';
            const { r, g, b } = rgb;
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            return brightness > 128 ? '#000000' : '#ffffff';
        },
        /**
         * 生成调色板
         */
        generatePalette(baseColor, count = 5) {
            const palette = [baseColor];
            for (let i = 1; i < count; i++) {
                const factor = i / (count - 1);
                if (i < count / 2) {
                    palette.push(this.lighten(baseColor, factor * 0.5));
                }
                else {
                    palette.push(this.darken(baseColor, (factor - 0.5) * 0.5));
                }
            }
            return palette;
        }
    };
    // 数学工具
    const math = {
        /**
         * 生成范围内随机数
         */
        random(min, max) {
            return Math.random() * (max - min) + min;
        },
        /**
         * 生成范围内随机整数
         */
        randomInt(min, max) {
            return Math.floor(this.random(min, max + 1));
        },
        /**
         * 限制数值范围
         */
        clamp(value, min, max) {
            return Math.min(Math.max(value, min), max);
        },
        /**
         * 线性插值
         */
        lerp(start, end, factor) {
            return start + (end - start) * factor;
        },
        /**
         * 映射数值范围
         */
        map(value, inMin, inMax, outMin, outMax) {
            return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
        },
        /**
         * 角度转弧度
         */
        degToRad(degrees) {
            return degrees * (Math.PI / 180);
        },
        /**
         * 弧度转角度
         */
        radToDeg(radians) {
            return radians * (180 / Math.PI);
        },
        /**
         * 计算两点距离
         */
        distance(x1, y1, x2, y2) {
            return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        },
        /**
         * 计算角度
         */
        angle(x1, y1, x2, y2) {
            return Math.atan2(y2 - y1, x2 - x1);
        },
        /**
         * 数值格式化
         */
        format(value, decimals = 2) {
            return value.toFixed(decimals);
        },
        /**
         * 百分比计算
         */
        percentage(value, total) {
            return total === 0 ? 0 : (value / total) * 100;
        }
    };
    // 导出所有高级工具
    var advanced = {
        data,
        file,
        http,
        image,
        animation,
        color,
        math
    };

    var advancedUtils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        animation: animation,
        color: color,
        data: data,
        default: advanced,
        file: file,
        http: http,
        image: image,
        math: math
    });

    /**
     * 巨天UI - 功能丰富的JavaScript UI组件库
     * 包含500+功能和组件
     */
    // 导入样式
    // 版本信息
    const version = '1.0.0';
    // 组件列表
    const components = [
        JTButton,
        JTInput,
        JTSwitch,
        JTCheckbox,
        JTRadio,
        JTSelect,
        JTOption,
        JTTable,
        JTTableColumn,
        JTDatePicker
    ];
    // 自动注册所有组件
    function install() {
        components.forEach(component => {
            if (component.register) {
                component.register();
            }
        });
    }
    // 如果在浏览器环境中，自动安装
    if (typeof window !== 'undefined') {
        window.JutianUI = {
            version,
            install,
            components: {
                JTButton,
                JTInput,
                JTSwitch,
                JTCheckbox,
                JTRadio,
                JTSelect,
                JTOption,
                JTTable,
                JTTableColumn,
                JTDatePicker
            },
            utils: {
                ...utils,
                advanced: advancedUtils
            }
        };
        // 自动安装组件
        install();
    }

    exports.JTButton = JTButton;
    exports.JTCheckbox = JTCheckbox;
    exports.JTDatePicker = JTDatePicker;
    exports.JTInput = JTInput;
    exports.JTOption = JTOption;
    exports.JTRadio = JTRadio;
    exports.JTSelect = JTSelect;
    exports.JTSwitch = JTSwitch;
    exports.JTTable = JTTable;
    exports.JTTableColumn = JTTableColumn;
    exports.advancedUtils = advancedUtils;
    exports.components = components;
    exports.install = install;
    exports.utils = utils;
    exports.version = version;

}));
//# sourceMappingURL=index.umd.js.map
