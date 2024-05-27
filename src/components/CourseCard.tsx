import { Course } from '../types'

const CourseCard: React.FC<Course> = ({ name, image, bgColor }) => {
	return (
		<div className='course-card' style={{ backgroundColor: bgColor }}>
			<img src={image} alt={name} />
			<h3>{name}</h3>
		</div>
	)
}

export default CourseCard
