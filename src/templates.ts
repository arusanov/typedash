export interface TemplateOptions {
  /***
   * Argument name to use in template function
   */
  dataName: string
  /***
   * Output array name for use in template function
   */
  outName: string
}

/***
 * Create a template function.
 * Syntax for template is `{{property}}` or `{{ if (someCondition} { out.push(someProp) } }}`
 * @param {string} template Template string
 * @param {{dataName:string,outName:string}}? options Options for template
 * @returns {(data: any) => string} Template function
 */
export function template (template: string, { dataName = '$__', outName = 'out' }: Partial<TemplateOptions> = {}): (data: any) => string {
  const re = /{{(.+?)}}/g
  const reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g
  let code = `with(${dataName}) {var ${outName}=[];\n`
  let cursor = 0
  let match
  const add = function (line: string, js?: boolean) {
    js ? (code += line.match(reExp) ? line + '\n' : `try{${outName}.push(` + line + ')}catch(_unused){};\n') : (code += line !== '' ? `${outName}.push("` + line.replace(/"/g, '\\"') + '");\n' : '')
    return add
  }

  // tslint:disable-next-line no-conditional-assignment
  while (match = re.exec(template)) {
    add(template.slice(cursor, match.index))(match[1], true)
    cursor = match.index + match[0].length
  }
  add(template.substr(cursor, template.length - cursor))
  code += `return ${outName}.join("");}`
  return new Function(dataName, code.replace(/[\r\t\n]/g, '')) as (data: any) => string
}
