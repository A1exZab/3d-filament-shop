import { ColorOption } from 'app/types'
import chroma from 'chroma-js'
import Select, { GroupBase, Props, StylesConfig } from 'react-select'

interface SelectInputProps {
	hasError?: boolean | undefined
}

export function ColorSelect<
	IsMulti extends boolean = false,
	Group extends GroupBase<ColorOption> = GroupBase<ColorOption>
>({ hasError, ...props }: Props<ColorOption, IsMulti, Group> & SelectInputProps) {
	const dot = (color = 'transparent') => ({
		alignItems: 'center',
		display: 'flex',

		':before': {
			backgroundColor: color,
			borderRadius: 10,
			content: '" "',
			display: 'block',
			marginRight: 6,
			height: 10,
			width: 10
		}
	})

	const selectStyles: StylesConfig<ColorOption, IsMulti, Group> = {
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
			color: 'var(--colors-text)',
			...dot('#ccc')
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
		option: (styles, { data, isSelected, isFocused }) => {
			const color = chroma(data.color)
			return {
				...styles,
				display: 'flex',
				textAlign: 'left',
				alignItems: 'center',
				fontSize: '14px',
				height: '24px',
				color: isSelected
					? chroma.contrast(color, 'white') > 2
						? 'white'
						: 'black'
					: 'var(--colors-text)',
				cursor: 'pointer',
				backgroundColor: isSelected ? data.color : isFocused ? color.alpha(0.1).css() : undefined,

				':active': {
					...styles[':active'],
					backgroundColor: isSelected ? data.color : color.alpha(0.3).css()
				}
			}
		},
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
			...dot()
		}),
		valueContainer: (styles) => ({
			...styles,
			margin: '0',
			padding: '0 8px'
		}),
		singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) })
	}
	return <Select<ColorOption, IsMulti, Group> {...props} styles={selectStyles} />
}
