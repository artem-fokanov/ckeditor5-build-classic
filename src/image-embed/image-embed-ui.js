import ImageEmbedForm from './image-embed-form';
import { createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

export default class ImageEmbedUI extends Plugin {
        
	static get pluginName() {
		return 'ImageEmbedUI';
	}

	init() {
		const editor = this.editor;
		const command = editor.commands.get( 'imageEmbed' );

		/**
		 * The form view displayed inside the drop-down.
		 */
		this.form = new ImageEmbedForm( getFormValidators( editor.t ), editor.locale );

		// Setup `imageUpload` button.
		editor.ui.componentFactory.add( 'imageEmbed', locale => {
			const dropdown = createDropdown( locale );

			this._setUpDropdown( dropdown, this.form, command, editor );
			this._setUpForm( this.form, dropdown, command );

			return dropdown;
		} );
	}

	_setUpDropdown(dropdown, form, command) {
		const editor = this.editor;
		const t = editor.t;
		const button = dropdown.buttonView;

		dropdown.bind('isEnabled').to(command);
		dropdown.panelView.children.add(form);

		button.set({
			label: t('Insert image'),
			icon: imageIcon,
			tooltip: true
		});

		// Note: Use the low priority to make sure the following listener starts working after the
		// default action of the drop-down is executed (i.e. the panel showed up). Otherwise, the
		// invisible form/input cannot be focused/selected.
		button.on('open', () => {
			// Make sure that each time the panel shows up, the URL field remains in sync with the value of
			// the command. If the user typed in the input, then canceled (`urlInputView#value` stays
			// unaltered) and re-opened it without changing the value of the media command (e.g. because they
			// didn't change the selection), they would see the old value instead of the actual value of the
			// command.
			form.url = command.value || '';
			form.urlInputView.select();
			form.focus();
		}, {priority: 'low'});

		dropdown.on('submit', () => {
			if (form.isValid()) {
				editor.execute('imageEmbed', form.url);
				closeUI();
			}
		});

		dropdown.on('change:isOpen', () => form.resetFormStatus());
		dropdown.on('cancel', () => closeUI());

		function closeUI() {
			editor.editing.view.focus();
			dropdown.isOpen = false;
		}
	}

	_setUpForm( form, dropdown, command ) {
		form.delegate( 'submit', 'cancel' ).to( dropdown );
		form.urlInputView.bind( 'value' ).to( command, 'value' );

		// Form elements should be read-only when corresponding commands are disabled.
		form.urlInputView.bind( 'isReadOnly' ).to( command, 'isEnabled', value => !value );
		form.saveButtonView.bind( 'isEnabled' ).to( command );
	}
}

function getFormValidators( t ) {
	return [
		form => {
			if ( !form.url.length ) {
				return t( 'The URL must not be empty.' );
			}
		},
		// form => {
		// 	if ( !registry.hasMedia( form.url ) ) {
		// 		return t( 'This image URL is not supported.' );
		// 	}
		// }
	];
}
