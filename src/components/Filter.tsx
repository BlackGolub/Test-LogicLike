import { useEffect, useState } from 'react'

interface FilterProps {
	tags: string[]
	selectedTags: string[]
	onTagSelect: (tag: string) => void
}

const Filter: React.FC<FilterProps> = ({ tags, selectedTags, onTagSelect }) => {
	const [allTags, setAllTags] = useState<string[]>(['Все темы', ...tags])

	useEffect(() => {
		setAllTags(['Все темы', ...tags])
	}, [tags])

	const handleTagSelect = (tag: string) => {
		if (tag === 'Все темы') {
			onTagSelect('')
		} else {
			onTagSelect(tag)
		}
	}

	return (
		<div className='filter'>
			{allTags.map(tag => (
				<button
					key={tag}
					className={
						selectedTags.includes(tag) ||
						(tag === 'Все темы' && selectedTags.length === 0)
							? 'selected'
							: ''
					}
					onClick={() => handleTagSelect(tag)}
				>
					{tag}
				</button>
			))}
		</div>
	)
}

export default Filter
