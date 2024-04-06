import resetAllSettings from '../features/resetAllSettings'
import { type BooleanKeys, type NumberKeys, type StringKeys, getValue, setValue } from '../utils/storage'
import { insertNewElement } from '../utils/dom'
import { exportSettings, importSettings } from '../features/settingsHandler'

class Checkbox {
  public label: string
  public key: BooleanKeys
  private _checked: boolean

  constructor(lable: string, key: BooleanKeys) {
    this.label = lable
    this.key = key
    this._checked = getValue(key, false)!
  }

  get checked() {
    return this._checked
  }

  set checked(value: boolean) {
    this._checked = value
    setValue(this.key, value)
  }
}

class Input {
  public label: string
  public key: StringKeys
  private _value: string

  constructor(label: string, key: StringKeys) {
    this.label = label
    this.key = key
    this._value = getValue(key, '')!
  }

  get value() {
    return this._value
  }

  set value(value: string) {
    this._value = value
    setValue(this.key, value)
  }
}

type ButtonType = 'primary' | 'warning' | 'danger'
class Button {
  public label: string
  public type: ButtonType
  public callback: () => void

  constructor(label: string, type: ButtonType, callback: () => void) {
    this.label = label
    this.type = type
    this.callback = callback
  }
}

class Select {
  public label: string
  public key: NumberKeys
  public options: string[]
  private _selected: number

  constructor(label: string, key: NumberKeys, options: string[]) {
    this.label = label
    this.key = key
    this.options = options
    this._selected = getValue(key, 0)!
  }

  get selected() {
    return this._selected
  }

  set selected(value: number) {
    this._selected = value
    setValue(this.key, value)
  }
}

type CategoryItem = Checkbox | Input | Button | Select
class Category {
  public label: string
  public key: BooleanKeys
  public items: CategoryItem[]
  private _expanded: boolean

  constructor(label: string, key: BooleanKeys, items: CategoryItem[]) {
    this.label = label
    this.key = key
    this.items = items
    this._expanded = getValue(key, false)!
  }

  get expanded() {
    return this._expanded
  }

  set expanded(value: boolean) {
    this._expanded = value
    setValue(this.key, value)
  }
}

function initCheckbox(parent: Element, checkbox: Checkbox) {
  const checkboxItem = insertNewElement(parent, 'div', { class: 'category-item category-checkbox' })
  const label = insertNewElement(checkboxItem, 'label')
  const checkboxMain = insertNewElement(label, 'input', { type: 'checkbox', checked: checkbox.checked }) as HTMLInputElement
  checkboxMain.checked = checkbox.checked
  insertNewElement(label, 'span', { text: checkbox.label })

  checkboxMain.addEventListener('change', () => {
    checkbox.checked = !checkbox.checked
    checkboxMain.checked = checkbox.checked
  })
}

function initInput(parent: Element, input: Input) {
  const inputItem = insertNewElement(parent, 'div', { class: 'category-item category-input' })
  const label = insertNewElement(inputItem, 'label')
  const span = insertNewElement(label, 'span', { text: `${input.label}` })
  const expandAnchor = insertNewElement(span, 'a', { text: '编辑' })
  const inputMain = insertNewElement(label, 'textarea', { text: input.value }) as HTMLTextAreaElement

  const updateValue = () => {
    input.value = inputMain.value
  }

  expandAnchor.addEventListener('click', (e) => {
    e.preventDefault()
    if (expandAnchor.textContent === '编辑') {
      expandAnchor.textContent = '收起'
      inputMain.style.display = 'block'
      updateValue()
    }
    else {
      expandAnchor.textContent = '编辑'
      inputMain.style.display = 'none'
    }
  })

  inputMain.addEventListener('input', () => {
    inputMain.style.height = 'auto'
    inputMain.style.height = `${inputMain.scrollHeight - 1}px`
  })

  inputMain.addEventListener('focusout', () => {
    updateValue()
  })
}

function initButton(parent: Element, button: Button) {
  const buttonItem = insertNewElement(parent, 'div', { text: button.label, class: `category-item category-button ${button.type}` })
  buttonItem.addEventListener('click', button.callback)
}

function initCategory(parent: Element, category: Category) {
  const categoryHeader = insertNewElement(parent, 'div', { class: `category-header ${category.expanded ? 'expanded' : ''}`, text: category.label })
  const categoryContent = insertNewElement(parent, 'div', { class: `category-content ${category.expanded ? 'expanded' : ''}` })

  categoryHeader.addEventListener('click', () => {
    category.expanded = !category.expanded
    categoryHeader.classList.toggle('expanded')
    categoryContent.classList.toggle('expanded')
  })

  category.items.forEach((item) => {
    if (item instanceof Checkbox)
      initCheckbox(categoryContent, item)
    else if (item instanceof Input)
      initInput(categoryContent, item)
    else if (item instanceof Button)
      initButton(categoryContent, item)
  })
}

const categories = [
  new Category('⚙️ 常规', 'category_general_expanded', [
    new Checkbox('网盘失效检查', 'netdisk_check'),
    new Checkbox('自动完成任务', 'auto_complete_tasks'),
    new Checkbox('默认进入图墙模式开关', 'image_wall_default')
  ]),
  new Category('🔄 无缝加载', 'category_seamless_expanded', [
    new Checkbox('无缝加载评论', 'seamless_load_comment'),
    new Checkbox('无缝加载帖子', 'seamless_load_post'),
    new Checkbox('无缝加载搜索结果', 'seamless_load_search')
  ]),
  new Category('🔞 SFW', 'category_sfw_expanded', [
    new Checkbox('替换帖子内用户头像', 'replace_sfw_avatar'),
    new Checkbox('隐藏帖子内图片', 'hide_post_image')
  ]),
  new Category('🔗 跳转', 'category_redirect_expanded', [
    new Checkbox('强制跳转桌面版', 'force_desktop'),
    new Checkbox('重定向到指定域名', 'domain_redirect'),
    new Input('指定域名', 'target_domain')
  ]),
  new Category('ℹ️ 关于', 'category_about_expanded', [
    new Button('导出设置', 'primary', exportSettings),
    new Button('导入设置', 'primary', importSettings),
    new Button('初始化所有设置', 'danger', resetAllSettings)
  ])
]

export function initSettingsPanel() {
  const contentMain = document.querySelector('#u-contentmain')!
  const settingsPanel = insertNewElement(contentMain, 'div', { class: 'settings-panel' })

  const settingsPanelTilte = insertNewElement(settingsPanel, 'h5', { class: 'u-h5' })
  insertNewElement(settingsPanelTilte, 'span', { text: '插件设置' })

  categories.forEach((category) => {
    initCategory(settingsPanel, category)
  })
}
