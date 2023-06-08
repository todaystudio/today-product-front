export const generateSlug = (str: string): string => {
	const alphanumeric = str.replace(/[^a-zA-Zа-яА-Я0-9]/g, '-')
	const singleHyphen = alphanumeric.replace(/-{2,}/g, '-')
	return singleHyphen.toLowerCase().replace(/^-+|-+$/g, '')
}
