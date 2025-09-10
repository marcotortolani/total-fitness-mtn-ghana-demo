// src/utils/functions.js

export function cleanDataPosts({
  posts,
  categorySlug,
  allCategoriesData,
  videosCategoryID,
}) {
  // process the content and return an object with id, title, images array, paragraph excerpt array
  let data = []
  for (let i = 0; i < posts.length; i++) {
    try {
      const post = posts[i]
      if (!post) continue

      let imgArray = [],
        pExcerpt = []

      if (post?.excerpt?.rendered) {
        post?.excerpt?.rendered
          .split('</p>')
          .map((item) => item.trim())
          .filter((item) => item !== '')
          .forEach((paragraph) => {
            pExcerpt.push(paragraph.replace(/<[^>]+>/g, ''))
          })
      }

      if (post?.content?.rendered) {
        post?.content?.rendered
          .split('</p>')
          .map((item) => item.trim())
          .forEach((element) => {
            if (element.includes('<img')) {
              const image = element.match(/src="(.*?)"/)[1].replaceAll('"', '')
              imgArray.push(image)
            }
          })
      }

      data.push({
        id: post.id,
        slug: post.slug,
        category:
          categorySlug !== 0
            ? categorySlug
            : allCategoriesData.find(
                (categ) =>
                  categ.id ===
                  post.categories.filter((cat) => cat !== videosCategoryID)[0],
              ).slug || '',
        title: post?.title?.rendered || '',
        excerpt: pExcerpt[0] || '',
        images: imgArray,
      })
    } catch (e) {
      console.log({ e })
    }
  }

  return data
}

export function getRandomPosts({ posts, qty = 'all' }) {
  if (qty === 'all' || qty > posts.length) return posts

  const elements = qty < 1 ? 1 : qty

  let postsRandom = []
  while (postsRandom.length < elements) {
    const index = Math.floor(Math.random() * posts.length)
    if (!postsRandom.some((el) => el.id === posts[index].id)) {
      postsRandom.push(posts[index])
    }
  }
  return postsRandom
}

export function getLatestPosts({ posts, qty = 'all' }) {
  if (qty === 'all' || qty > posts.length) return posts
  // take the "qty" latest
  const latestPosts = []
  for (let i = 0; i < qty; i++) {
    let post = posts[i]
    if (!post) break
    latestPosts.push(post)
  }

  return latestPosts
}

export function getImageHeaderPost(postData) {
  if (!postData) return

  // process the content and return the first image from an array
  let imgArray = []

  postData?.content.rendered
    .split('</p>')
    .map((item) => item.trim())
    .forEach((element) => {
      if (element.includes('<img')) {
        const image = element.match(/src="(.*?)"/)[1].replaceAll('"', '')
        imgArray.push(image)
      }
    })

  return imgArray[imgArray.length - 1]
}

export function getVimeoNumber({ string }) {
  // Regular expression to find the number after "vimeo.com"
  // Apply the regular expression to the string

  const match = string.match(/src="https:\/\/player.vimeo.com\/video\/(\d+)\?/)
  // Verify if has match
  return match && match[1] ? match[1] : null
}

export function processDataRendered(content) {
  if (typeof content !== 'string') return ''
  if (content.length === 0) return ''

  const imagePattern =
    /<img[^>]*(?:class=["'][^"']*imagen[^"']*["'][^>]*src=["']([^"']+)["']|src=["']([^"']+)["'][^>]*class=["'][^"']*imagen[^"']*["'])[^>]*>/i
  const imageFeaturedPattern =
    /<img\s+[^>]*class=["'][^"']*img-destacada[^"']*["'][^>]*src=["'](.+?)["'][^>]*>|<img\s+[^>]*src=["'](.+?)["'][^>]*class=["'][^"']*img-destacada[^"']*["'][^>]*>/i
  const imageSliderPattern =
    /<img[^>]*(?:class=["'][^"']*slider[^"']*["'][^>]*src=["'](.+?)["']|src=["'](.+?)["'][^>]*class=["'][^"']*slider[^"']*["'])[^>]*>/i
  const headingTitlePattern = /<h1\s+class=["']titulo["']>(.*?)<\/h1>/
  const headingDestacado1Pattern = /<h2\s+class=["']destacado-1["']>(.*?)<\/h2>/
  const headingDestacado2Pattern = /<h2\s+class=["']destacado-2["']>(.*?)<\/h2>/
  const paragraphPattern = /<p[^>]*\bclass=["']parrafo["'][^>]*>(.*?)<\/p>/s
  const listPattern = /<ul\s+class=["']lista["']>(.*?)<\/ul>/s
  const listItemPattern = /<li>(.*?)<\/li>/gs
  const bajadaPattern = /<p\s+class=["']bajada["']>(.*?)<\/p>/
  const videoPattern = /<iframe[^>]*\ssrc=["']([^"']+)["'][^>]*>/i

  const imagesSlider = []
  const elements = []

  // Regex pattern to match HTML tags and content
  // const fragmentPattern =
  //   /(<img\s+[^>]*\/?>)|(<(?:h[1-6]|p|ul|li)[^>]*>[\s\S]*?<\/(?:h[1-6]|p|li)>|<\/?ul>)/gis
  const fragmentPattern =
    /(<img\s+[^>]*\/?>)|(<(?:h[1-6]|p|ul|li|iframe)[^>]*>[\s\S]*?<\/(?:h[1-6]|p|li|iframe)>|<\/?ul>)/gis

  const fragments = content.match(fragmentPattern).filter(Boolean)
  // Process the fragments to combine <ul> and its contents into a single element
  const processedFragments = []
  let ulContent = ''
  fragments.forEach((fragment) => {
    if (fragment.startsWith('<ul')) {
      ulContent = fragment // Start collecting <ul> content
    } else if (fragment.startsWith('</ul')) {
      ulContent += fragment // End collecting <ul> content
      processedFragments.push(
        ulContent
          .replace('\n', '')
          .replace('\n<p>&nbsp;</p>', '')
          .replace('<p>&nbsp;</p>', ''),
      ) // Push the combined <ul> content without the &nbsp; paragraph
      ulContent = '' // Reset for next <ul>
    } else if (ulContent) {
      ulContent += fragment // Continue collecting <ul> content
    } else {
      processedFragments.push(fragment) // Non-<ul> content
    }
  })

  processedFragments.forEach((frag) => {
    // clean fragments with <br/> tag
    const fragment = frag.replace(/<br\s*\/?>/gi, '')
    let match

    // Process "bajada"
    if ((match = bajadaPattern.exec(fragment))) {
      elements.push({ type: 'bajada', content: match[1] })
    }

    // Process h1
    if ((match = headingTitlePattern.exec(fragment))) {
      elements.push({ type: 'titulo', content: match[1] })
    }
    // Process "destacado-1"
    if ((match = headingDestacado1Pattern.exec(fragment))) {
      elements.push({ type: 'destacado-1', content: match[1] })
    }
    // Process "destacado-2"
    if ((match = headingDestacado2Pattern.exec(fragment))) {
      elements.push({ type: 'destacado-2', content: match[1] })
    }

    // Process Unordered Lists with "lista" class name
    let inList
    if ((match = listPattern.exec(fragment))) {
      inList = true
      let currentList = []
      let listItemMatch
      while ((listItemMatch = listItemPattern.exec(match[1]))) {
        const listItemContent = listItemMatch[1].match(
          /<strong>(.*?)<\/strong>(.*)/s,
        )
        if (listItemContent) {
          currentList.push({
            title: listItemContent[1].trim(),
            content: listItemContent[2].trim(),
          })
        } else {
          currentList.push({ title: '', content: listItemMatch[1].trim() })
        }
      }
      elements.push({ type: 'lista', content: currentList })
    }

    if (inList && fragment.startsWith('</ul>')) {
      inList = false
    }

    // Process Paragraphs & Images inside of Paragraphs
    if ((match = paragraphPattern.exec(fragment))) {
      // Filter common paragraphs & images inside of paragraphs
      if (!/<img\s+.*?>/.test(fragment)) {
        elements.push({ type: 'paragraph', content: match[1] })
      } else {
        const imageElement = fragment.replace(/<\/?p>/g, '')

        // Images with "imagen" class name
        if (imagePattern.test(imageElement)) {
          const srcPattern = /<img[^>]*\ssrc=["']([^"']+)["'][^>]*>/i
          const match = srcPattern.exec(imageElement)
          if (match) {
            const srcValue = match[1]
            elements.push({ type: 'imagen', content: srcValue })
          }
        }

        // Images with "img-destacada" class name
        if (imageFeaturedPattern.test(imageElement)) {
          const srcPattern = /<img[^>]*\ssrc=["']([^"']+)["'][^>]*>/i
          const match = srcPattern.exec(imageElement)
          if (match) {
            const srcValue = match[1]
            elements.push({ type: 'img-destacada', content: srcValue })
          }
        }

        //Images with "slider" class name
        if (imageSliderPattern.test(imageElement)) {
          const srcPattern = /<img[^>]*\ssrc=["']([^"']+)["'][^>]*>/i
          const match = srcPattern.exec(imageElement)
          if (match) {
            imagesSlider.push(match[1])
          }
        }
      }
    }

    // Procesar Iframe para Video
    if ((match = videoPattern.exec(fragment))) {
      elements.push({ type: 'video', content: match[1] })
    }
  })

  return { imagesSlider, elements }
}
