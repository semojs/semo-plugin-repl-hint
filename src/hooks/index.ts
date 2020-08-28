import { convertUrlToMarkdown, convertMarkdownToFile } from 'semo-plugin-read'
import marked from 'marked'
import TerminalRenderer from 'marked-terminal'
marked.setOptions({
  renderer: new TerminalRenderer()
})

export = (Utils) => {
  return {
    hook_repl_command: new Utils.Hook('semo', () => {
      return {
        hint: {
          help: 'Get dev hints from devhints.io',
          async action(input) {
            if (!input) {
              Utils.warn('keyword is required')
            } else {
              // @ts-ignore
              this.clearBufferedCommand()
              let opts = Utils.yParser(input)
              let keyword = opts._.join(' ')

              const converted = await convertUrlToMarkdown({
                url: `https://devhints.io/${keyword}`
              })

              const { markdown, title } = converted

              if (opts.copy || opts.copyOnly) {
                await convertMarkdownToFile({
                  format: 'clipboard',
                  markdown,
                  title,
                  converted,
                  argv: {
                    url: `https://devhints.io/${keyword}`
                  }
                })
              }

              if (!opts.copyOnly) {
                Utils.consoleReader(marked(markdown), {
                  plugin: 'semo-plugin-repl-hint',
                  identifier: input
                })
              }

               // @ts-ignore
              this.displayPrompt()
            }
          }

        }
      }
    })
  }
}