import Command from '@ckeditor/ckeditor5-core/src/command';
import ModelElement from '@ckeditor/ckeditor5-engine/src/model/element';

export default class ImageEmbedCommand extends Command {

	execute( url ) {
		const editor = this.editor;
		const doc = this.editor.model;

		doc.enqueueChange( () => {
			const imageElement = new ModelElement( 'image', {
				src: url
				// alt: imageAlt
			} );

			editor.model.insertContent( imageElement, doc.selection );
		} );
	}
}

