// @flow
import * as React from 'react';
import ReactMde from '../src';
import * as Showdown from 'showdown';

export type AppState = {
  value: string,
  tab: 'write' | 'preview',
  maximized: boolean
};

export class App extends React.Component<{}, AppState> {
  converter: Showdown.Converter;

  constructor(props: any) {
    super(props);
    this.state = {
      value: '**Hello world!!!**',
      tab: 'write',
      maximized: false
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
  }

  handleValueChange = (value: string) => {
    this.setState({ value });
  };

  handleTabChange = (tab: 'write' | 'preview') => {
    this.setState({ tab });
  };

  handleMaximizedChange = (isMaximized: boolean) => {
    this.setState({ maximized: isMaximized });
  };

  loadSuggestions = async (text: string) => {
    return new Promise<Suggestion[]>((accept, reject) => {
      setTimeout(() => {
        const suggestions: Suggestion[] = [
          {
            preview: 'Andre',
            value: '@andre'
          },
          {
            preview: 'Angela',
            value: '@angela'
          },
          {
            preview: 'David',
            value: '@david'
          },
          {
            preview: 'Louise',
            value: '@louise'
          }
        ].filter(i => i.preview.toLowerCase().includes(text.toLowerCase()));
        accept(suggestions);
      }, 250);
    });
  };

  render() {
    const save: SaveImageHandler = async function*(data: ArrayBuffer) {
      // Promise that waits for "time" milliseconds
      const wait = function(time: number) {
        return new Promise((a, r) => {
          setTimeout(() => a(), time);
        });
      };

      // Upload "data" to your server
      // Use XMLHttpRequest.send to send a FormData object containing
      // "data"
      // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

      await wait(2000);
      // yields the URL that should be inserted in the markdown
      yield 'https://picsum.photos/300';
      await wait(2000);

      // returns true meaning that the save was successful
      return true;
    };

    return (
      <div>
        <style jsx global>{`
          body {
            margin: 0;
          }
        `}</style>
        <style jsx>
          {`
            div {
              display: ${this.state.maximized ? 'flex' : 'block'};
              max-width: ${this.state.maximized ? 'none' : '650px'};
              height: ${this.state.maximized ? 'auto' : '600px'};
              padding: 10px;
              margin: 0 auto;
              flex: 1;
            }
          `}
        </style>
        <ReactMde
          onChange={this.handleValueChange}
          onTabChange={this.handleTabChange}
          onMaximizedChange={this.handleMaximizedChange}
          value={this.state.value}
          generateMarkdownPreview={markdown =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
          selectedTab={this.state.tab}
          loadSuggestions={this.loadSuggestions}
          suggestionTriggerCharacters={['@']}
          paste={{
            saveImage: save
          }}
        />
      </div>
    );
  }
}
