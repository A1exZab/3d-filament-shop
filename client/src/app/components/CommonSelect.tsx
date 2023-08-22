import Select, { GroupBase, Props, StylesConfig } from 'react-select'

interface SelectInputProps {
	hasError?: boolean | undefined
}

export function CommonSelect<
	Option,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>
>({ hasError, ...props }: Props<Option, IsMulti, Group> & SelectInputProps) {
	const selectStyles: StylesConfig<Option, IsMulti, Group> = {
		dropdownIndicator: (styles, { isFocused }) => ({
			...styles,
			color: isFocused ? 'var(--colors-primary)' : hasError ? 'var(--colors-danger)' : '#cecece',
			transform: 'rotate(-90deg)',
			padding: '0',
			marginRight: '6px',
			transition: 'all 0.3s ease-in-out',
			':hover': { transform: 'rotate(0deg)' }
		}),
		indicatorSeparator: (styles) => ({ ...styles, display: 'none' }),
		placeholder: (styles) => ({
			...styles,
			margin: '0',
			color: 'var(--colors-text)'
		}),
		control: (styles, { isFocused }) => ({
			...styles,
			fontSize: '14px',
			display: 'flex',
			minHeight: '0',
			alignItems: 'center',
			height: '24px',
			width: '240px',
			borderColor: isFocused
				? 'var(--colors-primary)'
				: hasError
				? 'var(--colors-danger)'
				: '#cecece',
			borderWidth: '1px',
			borderStyle: 'solid',
			boxShadow: 'none',
			backgroundColor: 'white',
			borderRadius: '12px',
			cursor: 'pointer',
			padding: '0',
			':hover': {
				borderColor: isFocused
					? 'var(--colors-primary)'
					: hasError
					? 'var(--colors-danger)'
					: '#cecece'
			}
		}),
		option: (styles, { isSelected, isFocused }) => ({
			...styles,
			display: 'flex',
			textAlign: 'left',
			alignItems: 'center',
			fontSize: '14px',
			height: '24px',
			color: isSelected ? 'white' : 'var(--colors-text)',
			cursor: 'pointer',
			backgroundColor: isSelected ? 'var(--colors-primary)' : isFocused ? '#f5f5f5' : undefined
		}),
		menu: (styles) => ({
			...styles,
			border: '1px solid #cecece',
			borderRadius: '6px',
			boxShadow: 'none',
			width: '240px'
		}),
		input: (styles) => ({
			...styles,
			height: '24px',
			margin: '0',
			padding: '0',
			display: 'flex'
		}),

		valueContainer: (styles) => ({
			...styles,
			margin: '0',
			padding: '0 8px'
		})
	}
	return <Select<Option, IsMulti, Group> {...props} styles={selectStyles} />
}
