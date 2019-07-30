import LabeledInputView from '@ckeditor/ckeditor5-ui/src/labeledinput/labeledinputview';
import InputTextView from '@ckeditor/ckeditor5-ui/src/inputtext/inputtextview';
import MediaFormView from '@ckeditor/ckeditor5-media-embed/src/ui/mediaformview';

export default class ImageEmbedForm extends MediaFormView {

	_createUrlInput() {
		const t = this.locale.t;

		const labeledInput = new LabeledInputView( this.locale, InputTextView );
		const inputView = labeledInput.inputView;

		this._urlInputViewInfoDefault = t( 'Paste the image URL in the input.' );
		this._urlInputViewInfoTip = t( 'Tip: Paste the URL into the content to embed faster.' );

		labeledInput.label = t( 'Image URL' );
		labeledInput.infoText = this._urlInputViewInfoDefault;
		inputView.placeholder = 'https://example.com';

		inputView.on( 'input', () => {
			// Display the tip text only when there's some value. Otherwise fall back to the default info text.
			labeledInput.infoText = inputView.element.value ? this._urlInputViewInfoTip : this._urlInputViewInfoDefault;
		} );

		return labeledInput;
	}
}