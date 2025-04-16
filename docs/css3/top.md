## custom-select.tsx

```tsx
import { SelectProps } from 'antd'
import React, { useState, useRef } from 'react'
import styles from './custom-select.module.css'

interface IProps {
	options: { label: string; value: string }[]
	onSearch?: (value: string) => void
	onChange?: (value: { label: string; value: string }) => void
	notFoundContent?: React.ReactNode
	style?: React.CSSProperties
	placeholder?: string
}

export const CustomSelect: React.FC<IProps> = ({ options, onSearch, onChange, notFoundContent = 'No options found', style, placeholder = 'Search...' }) => {
	const [inputValue, setInputValue] = useState('')
	const [showDropdown, setShowDropdown] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setInputValue(value)
		onSearch?.(value)

		if (value) {
			setShowDropdown(true)
		} else {
			setShowDropdown(false)
		}
	}

	const handleSelect = (item: { label: string; value: string }) => {
		setInputValue(item.label)
		setShowDropdown(false)
		onChange?.(item)
	}

	const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
		if (!containerRef.current?.contains(event.relatedTarget as Node)) {
			setShowDropdown(false)
		}
	}

	return (
		<div
			ref={containerRef}
			className={styles.select_container}
			style={{ ...style }}
			onBlur={handleBlur}
			tabIndex={-1} // Make the div focusable
		>
			<input
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				placeholder={placeholder}
				className={styles.select_input}
				onFocus={() => inputValue && setShowDropdown(true)}
			/>

			{showDropdown && (
				<ul className={styles.options_container}>
					{options.length > 0 ? (
						options.map((item) => (
							<li key={item.value} onClick={() => handleSelect(item)} className={`${styles.option} ${inputValue === item.value && styles.active}`}>
								{item.label}
							</li>
						))
					) : (
						<li className={styles.noFound}>{notFoundContent}</li>
					)}
				</ul>
			)}
		</div>
	)
}

```

## custom-select.module.css

```css
.select_container {
    position: relative;
    width: 200px;
}

.select_input {
    width: 100%;
    padding: 4px;
    border: 1px solid var(--light-grey);
    background-color: var(--light-grey);
    border-radius: 4px;
    font-size: 12px;
}

.options_container {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 1);
    list-style: none;
    margin: 0;
    padding: 0;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    backdrop-filter: blur(5px);
    z-index: 99;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    max-height: 150px;
    overflow-y: auto;
    font-size: 11px;
}

.option {
    padding: 4px 8px;
}

.option.active {
    background-color: #1980ff !important;
    color: #fff !important;
}

.option:first-of-type,
.option:last-of-type {
    margin-top: 6px;
}

.option:hover {
    cursor: pointer;
    background-color: #fafafa;
}

.noFound {
    padding: 4px 8px;
}
```

## 为什么 options_container top使用的是100% 这个100%相对输入框？

`.options_container` 中的 `top: 100%` 会将下拉菜单放在输入框正下方。原因如下：

1. **相对定位上下文**：`.select_container` 是下拉菜单（`.options_container`）的父元素，并且设置了 `position: relative`。这意味着下拉菜单的 `top: 100%` 是基于 `.select_container` 的高度计算的，而这个容器包含了输入框。

2. **绝对定位**：`.options_container` 使用 `position: absolute`，相对于最近的相对定位祖先（即 `.select_container`）进行定位。`top: 100%` 会将下拉菜单的顶部移动到 `.select_container` 的高度之下，从而使其直接出现在输入框的下方。

这种设置确保了无论内容如何变化，下拉菜单都会正确地显示在输入框下方。
