import React from 'react'
import HeaderComp from '../../components/globalComp/header'
import BlogDetailsCss from '../../components/blogComp/detailOneCss'
import BlogDetailsJavascript from '../../components/blogComp/detailTwoJavascript'
import BlogDetailsReact from '../../components/blogComp/detailThreeReact'
import AboutDetails from '../../components/blogComp/authorDescription'

export default function BlogsPage() {
  return (
    <div>
      < HeaderComp h1='showcasing all content'/>
      <AboutDetails />
      < BlogDetailsCss/>
      <BlogDetailsJavascript />
      <BlogDetailsReact />
    </div>
  )
}
