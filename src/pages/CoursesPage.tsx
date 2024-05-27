import { useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard'
import Filter from '../components/Filter'
import { getCourses } from '../services/api'
import { Course } from '../types'

const CoursesPage: React.FC = () => {
	const [courses, setCourses] = useState<Course[]>([])
	const [selectedTags, setSelectedTags] = useState<string[]>([])

	useEffect(() => {
		const fetchCourses = async () => {
			const data = await getCourses()
			setCourses(data)
		}
		fetchCourses()
	}, [])

	const handleTagSelect = (tag: string) => {
		if (tag === '') {
			setSelectedTags([])
		} else {
			setSelectedTags(prev =>
				prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
			)
		}
	}

	const filteredCourses =
		selectedTags.length === 0
			? courses
			: courses.filter(course =>
					selectedTags.every(tag => course.tags.includes(tag))
			  )

	const allTags = Array.from(new Set(courses.flatMap(course => course.tags)))

	const emptyCards = Array.from({
		length: (3 - (filteredCourses.length % 3)) % 3,
	})

	return (
		<div className='courses-page'>
			<Filter
				tags={allTags}
				selectedTags={selectedTags}
				onTagSelect={handleTagSelect}
			/>
			<div className='course-list'>
				{filteredCourses.map(course => (
					<CourseCard key={course.id} {...course} />
				))}
				{emptyCards.map((_, index) => (
					<div key={`empty-${index}`} className='course-card empty'></div>
				))}
			</div>
		</div>
	)
}

export default CoursesPage
