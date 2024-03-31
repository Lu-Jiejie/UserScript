import { initSettings } from './utils/storage'
import domainRedirect from './features/domainRedirect'
import forceDesktop from './features/forceDesktop'
import netdiskCheck from './features/netdiskCheck'
import { initUI } from './ui'
import autoCompleteTasks from './features/autoCompleteTasks'
import { GM_addStyle } from '$'

GM_addStyle(`
html {  
  margin-left: calc(100vw - 100%);  
} 
.category-header {
  margin: 0;
  padding: 0.7em;
  color: #333;
  background-color: #ccc;
  font-size: 1.25em;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
}
.category-header:after {
  content: '🔽';
  float: right;
  font-size: 1.0em;
}
.category-header.expanded:after {
  content: '🔼';
}

.category-content {
  margin-bottom: 0.2em;
  // padding: 0 0.7em ;
  background-color: #eee;
  color: #333;
  font-size: 1.2em;
  overflow: hidden;
  user-select: none;
  max-height: 0;
  // transition: all 0.2s ease;
}
.category-content.expanded{
  max-height: 1000px;
  // transition: all 0.2s ease;
}

.category-item {
  padding: 0.6em 1em;
}

// .category-item:hover {
//   background-color: #ddd;
// }

.category-checkbox input {
  margin-top: -0.05em;
  // margin-left: 0;
  vertical-align: middle;
}
.category-checkbox span {
  vertical-align: middle;
}

.category-input label{
  display: flex;
  flex-direction: column;
}
.category-input span {
  margin-left: 0.2em;
}
.category-input a {
  margin-left: 0.4em;
  cursor: pointer;
  text-decoration: underline;
}
.category-input a:not(:hover) {
  color: inherit;
}
.category-input textarea {
  margin-top: 0.1em;
  display: none;
  font-size: 1.2em;
  min-height: 1.3em;
  overflow: hidden;
  resize: none;
  outline: 0 none;
}

.category-button {
  cursor: pointer;
  text-align: center;
  font-size: 1.2em;
}
.category-button.primary {
  color: inherit;
}
.category-button.primary:hover {
  background-color: #ddd;
}
.category-button.warning {
  color: #e6a23c;
}
.category-button.warning:hover {
  color: white;
  background-color: #e6a23c;
}
.category-button.danger {
  color: #f56c6c
}
.category-button.danger:hover {
  background-color: #f56c6c;
  color: white;
}
`)

initSettings()
initUI()

netdiskCheck()
autoCompleteTasks()

forceDesktop()
domainRedirect()
