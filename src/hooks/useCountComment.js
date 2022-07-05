export const useCountComment = () => {
	return (comments, item) =>
		comments.items.filter((obj) => obj.post._id === item._id).length
}
