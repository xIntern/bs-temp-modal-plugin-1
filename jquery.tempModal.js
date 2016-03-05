/*
 * Copyright (c) 2016 Andreas Waadeland
 * Usage:
 * $.tempModal({
 *     id: 'foo',
 *     header: '<h4 class="modal-title">Lorem</h4>',
 *     body: '<p>Lorem ipsum dolor sit amet</p>',
 *     footer: '<button class="btn btn-default" data-dismiss="modal">Close</button>',
 *     size: 'sm',
 *     type: 'danger',
 *     showCloseButton: false,
 *     bsModalOptions: {
 *         backdrop: 'static',
 *         keyboard: false
 *     }
 * });
 */
(function($) {
    'use strict';
    $.tempModal = function(options) {
        var defaults = {
            bsModalOptions: {},
            id: '',
            type: 'default',
            size: '',
            header: '',
            body: '',
            footer: '',
            showCloseButton: true
        };
        var opts = $.extend(true, {}, defaults, options);
        var html = {
            id: (opts.id) ? 'id="' + opts.id + '" ' : '',
            closeBtn: (opts.showCloseButton) ? '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' : '',
            footer: (opts.footer) ? '<div class="modal-footer">' + opts.footer + '</div>' : ''
        };
        var selector = (opts.id) ? '#' + opts.id : '.tempModal';
        opts.size = ($.inArray(opts.size.toLowerCase(), ['sm', 'lg']) >= 0) ? ' modal-' + opts.size.toLowerCase() : '';
        opts.type = ($.inArray(opts.type.toLowerCase(), ['default', 'info', 'primary', 'success', 'warning', 'danger']) >= 0) ? ' modal-header-' + opts.type.toLowerCase() : '';
        var modalHtml = '<div ' + html.id + 'class="modal fade tempModal" tabindex="-1" role="dialog"><div class="modal-dialog' + opts.size + '"><div class="modal-content"><div class="modal-header' + opts.type + '">' + html.closeBtn +  opts.header + '</div><div class="modal-body">' + opts.body + '</div>' + html.footer + '</div></div></div>';
        if ($('.tempModal').length) {
            console.error('Remove all open tempModals before attempting to open new ones');
        } else {
            $('body').prepend(modalHtml);
            $(selector).modal(opts.bsModalOptions);
        }
        $('body').on('hidden.bs.modal', selector, function() {
            $(this).remove();
        });
    };
}(jQuery));
