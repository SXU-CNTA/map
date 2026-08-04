interface SiteConfiguration {
  markdown: {
    container: {
      warningLabel?: string
      errorLabel?: string
      infoLabel?: string
      expanderLabel?: string
    }
  }
  getRouteCategoryTitle: (routeSegment: string) => string
  titleSuffix: string
  theme: 'normal' | 'new-year'
  pureStatic?: boolean
}

export const RouteTitleRecord: Record<string, string> = {
  news: '新闻',
  announcements: '公告',
}

// 校园网探测地址：用于判断访问者是否身处校园网，决定 internal 项目是否显示“仅校园网”标签。
// - 留空（''）：所有 internal 项目始终显示“仅校园网”标签（推荐，尚未配置探测服务时也可见）；
// - 填写仅在校园网内可达的地址（如校内 Wiki、运维系统等）：仅在校园网外访问时显示该标签（与原版行为一致）。
export const CampusNetworkCheckUrl = ''

export const SiteConfiguration: SiteConfiguration = {
  markdown: {
    container: {
      warningLabel: '警告',
      errorLabel: '错误',
      infoLabel: '信息',
      expanderLabel: '更多',
    },
  },
  getRouteCategoryTitle: (routeSegment) => {
    if (routeSegment === 'tags') {
      return '标签'
    }
    return RouteTitleRecord[routeSegment]
  },
  titleSuffix: 'CNTA',
  theme: 'normal',
  pureStatic: true,
}
