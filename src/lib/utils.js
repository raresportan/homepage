export const formatDate = (dateString) => {
	if (!dateString) {
		return "";
	}
	const options = { year: "numeric", month: "long", day: "2-digit" };
	const date = new Date(dateString);
	try {
		return date.toLocaleDateString("default", options);
	} catch (err) {
		// handle IE 11
		return date.toLocaleDateString();
	}
};

export const slug = (post) => post && post.file.split(/(?<=content\/)(.*)(?=\/index.md)/)[1];

export const slugify = name => name && name.toLowerCase().split(' ').join('-');

export const slugifyAll = names => names && names.map(slugify);

export const getUniqueTags = posts => {
	const allTags = new Set(posts.filter(post => post.frontmatter.keywords).map(post => post.frontmatter.keywords).flat());
	return [...allTags];		
}
