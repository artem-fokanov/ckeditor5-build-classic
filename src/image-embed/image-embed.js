import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ImageEmbedUI from './image-embed-ui';
import ImageEmbedCommand from "./image-embed-command";

export default class ImageEmbed extends Plugin {
        
	static get pluginName() {
        return 'ImageEmbed';
	}
        
	static get requires() {
        return [ ImageEmbedUI ];
    }

    constructor(props) {
        super(props);
        const editor = this.editor;
        editor.commands.add( 'imageEmbed', new ImageEmbedCommand( editor ) );
    }
};