const unknown = require('../presentator/unknown_type.js');
const kv_table = require('../presentator/kv_table.js');
const parser = require('./atom_parser')

module.exports.atom = {
    ftyp: {
        description: "file type and compatibility",
        hasChild: false,
        display: kv_table.preview_html,
        parser: parser.parseFileTypeBox
    },
    pdin: {
        description: "progressive download information",
        hasChild: false,
        display: unknown.preview_html
    },
    moov: {
        description: "container for all the metadata",
        hasChild: true,
        display: unknown.preview_html
    },
    mvhd: {
        description: "movie header, overall declarations",
        hasChild: false,
        display: kv_table.preview_html,
        parser: parser.parseMovieHeaderBox
    },
    trak: {
        description: "container for an individual track or stream",
        hasChild: true,
        display: unknown.preview_html
    },
    tkhd: {
        description: "track header, overall information about the track",
        hasChild: false,
        display: kv_table.preview_html,
        parser: parser.parseTrackHeaderBox
    },
    tref: {
        description: "track reference container",
        hasChild: false,
        display: kv_table.preview_html,
        parser: parser.parseTrackReferenceBox
    },
    edts: {
        description: "edit list container",
        hasChild: true,
        display: unknown.preview_html
    },
    elst: {
        description: "an edit list",
        hasChild: false,
        display: unknown.preview_html
    },
    mdia: {
        description: "container for the media information in a track",
        hasChild: true,
        display: unknown.preview_html
    },
    mdhd: {
        description: "media header, overall information about the media",
        hasChild: false,
        display: kv_table.preview_html,
        parser: parser.parseMediaHeaderBox
    },
    hdlr: {
        description: "handler, declares the media (handler) type",
        hasChild: false,
        display: kv_table.preview_html,
        parser: parser.parseHandlerReferenceBox
    },
    minf: {
        description: "media information container",
        hasChild: true,
        display: unknown.preview_html
    },
    vmhd: {
        description: "video media header, overall information (video track only)",
        hasChild: false,
        display: kv_table.preview_html,
        parser: parser.parseVideoMediaHeaderBox
    },
    smhd: {
        description: "sound media header, overall information (sound track only)",
        hasChild: false,
        display: kv_table.preview_html,
        parser: parser.parseSoundMediaHeaderBox
    },
    hmhd: {
        description: "hint media header, overall information (hint track only)",
        hasChild: false,
        display: kv_table.preview_html,
        parser: parser.parseHintMediaHeaderBox
    },
    nmhd: {
        description: "Null media header, overall information (some tracks only)",
        hasChild: false,
        display: unknown.preview_html
    },
    dinf: {
        description: "data information box, container",
        hasChild: true,
        display: unknown.preview_html
    },
    dref: {
        description: "data reference box, declares source(s) of media data in track",
        hasChild: false,
        display: unknown.preview_html
    },
    stbl: {
        description: "sample table box, container for the time/space map",
        hasChild: true,
        display: unknown.preview_html
    },
    stsd: {
        description: "sample descriptions (codec types, initialization etc.)",
        hasChild: false,
        display: kv_table.preview_html,
        parser: parser.parseSampleDescriptionBox
    },
    stts: {
        description: "(decoding) time-to-sample",
        hasChild: false,
        display: kv_table.preview_html,
        parser: parser.parseTimeToSampleBox
    },
    ctts: {
        description: "(composition) time to sample",
        hasChild: false,
        display: unknown.preview_html
    },
    stsc: {
        description: "sample-to-chunk, partial data-offset information",
        hasChild: false,
        display: kv_table.preview_html,
        parser: parser.parseSampleToChunkBox
    },
    stsz: {
        description: "sample sizes (framing)",
        hasChild: false,
        display: kv_table.preview_html,
        parser: parser.parseSampleSizeBox
    },
    stz2: {
        description: "compact sample sizes (framing)",
        hasChild: false,
        display: kv_table.preview_html,
        parser: parser.parseSampleSizeBox
    },
    stco: {
        description: "chunk offset, partial data-offset information",
        hasChild: false,
        display: kv_table.preview_html,
        parser: parser.parseChunkOffsetBox
    },
    co64: {
        description: "64-bit chunk offset",
        hasChild: false,
        display: unknown.preview_html
    },
    stss: {
        description: "sync sample table (random access points)",
        hasChild: false,
        display: kv_table.preview_html,
        parser: parser.parseSyncSampleBox
    },
    stsh: {
        description: "shadow sync sample table",
        hasChild: false,
        display: unknown.preview_html
    },
    padb: {
        description: "sample padding bits",
        hasChild: false,
        display: unknown.preview_html
    },
    stdp: {
        description: "sample degradation priority",
        hasChild: false,
        display: unknown.preview_html
    },
    sdtp: {
        description: "independent and disposable samples",
        hasChild: false,
        display: unknown.preview_html
    },
    sbgp: {
        description: "sample-to-group",
        hasChild: false,
        display: unknown.preview_html
    },
    sgpd: {
        description: "sample group description",
        hasChild: false,
        display: unknown.preview_html
    },
    subs: {
        description: "sub-sample information",
        hasChild: false,
        display: unknown.preview_html
    },
    mvex: {
        description: "movie extends box",
        hasChild: true,
        display: unknown.preview_html
    },
    mehd: {
        description: "movie extends header box",
        hasChild: false,
        display: kv_table.preview_html,
        parser: parser.parseMovieExtendsHeaderBox
    },
    trex: {
        description: "track extends defaults",
        hasChild: false,
        display: unknown.preview_html
    },
    ipmc: {
        description: "IPMP Control Box",
        hasChild: false,
        display: unknown.preview_html
    },
    moof: {
        description: "movie fragment",
        hasChild: true,
        display: unknown.preview_html
    },
    mfhd: {
        description: "movie fragment header",
        hasChild: false,
        display: kv_table.preview_html,
        parser: parser.parseMovieFragmentHeaderBox
    },
    traf: {
        description: "track fragment",
        hasChild: true,
        display: unknown.preview_html
    },
    tfhd: {
        description: "track fragment header",
        hasChild: false,
        display: kv_table.preview_html,
        parser: parser.parseTrackFragmentHeaderBox
    },
    trun: {
        description: "track fragment run",
        hasChild: false,
        display: kv_table.preview_html,
        parser: parser.parseTrackFragmentRunBox
    },
    sdtp: {
        description: "independent and disposable samples",
        hasChild: false,
        display: unknown.preview_html
    },
    sbgp: {
        description: "sample-to-group",
        hasChild: false,
        display: unknown.preview_html
    },
    subs: {
        description: "sub-sample information",
        hasChild: false,
        display: unknown.preview_html
    },
    mfra: {
        description: "movie fragment random access",
        hasChild: true,
        display: unknown.preview_html
    },
    tfra: {
        description: "track fragment random access",
        hasChild: false,
        display: unknown.preview_html
    },
    mfro: {
        description: "movie fragment random access offset",
        hasChild: false,
        display: unknown.preview_html
    },
    mdat: {
        description: "media data container",
        hasChild: false,
        display: unknown.preview_html
    },
    free: {
        description: "free space",
        hasChild: false,
        display: unknown.preview_html
    },
    skip: {
        description: "free space",
        hasChild: true,
        display: unknown.preview_html
    },
    udta: {
        description: "User data",
        hasChild: true,
        display: unknown.preview_html
    },
    cprt: {
        description: "copyright etc.",
        hasChild: false,
        display: unknown.preview_html
    },
    meta: {
        description: "metadata",
        hasChild: true,
        display: unknown.preview_html
    },
    dinf: {
        description: "data information box, container",
        hasChild: true,
        display: unknown.preview_html
    },
    dref: {
        description: "data reference box, declares source(s) of metadata items",
        hasChild: false,
        display: unknown.preview_html
    },
    ipmc: {
        description: "IPMP Control Box",
        hasChild: false,
        display: unknown.preview_html
    },
    iloc: {
        description: "item location",
        hasChild: false,
        display: unknown.preview_html
    },
    ipro: {
        description: "item protection",
        hasChild: true,
        display: unknown.preview_html
    },
    sinf: {
        description: "protection scheme information box",
        hasChild: true,
        display: unknown.preview_html
    },
    frma: {
        description: "original format box",
        hasChild: false,
        display: unknown.preview_html
    },
    imif: {
        description: "IPMP Information box",
        hasChild: false,
        display: unknown.preview_html
    },
    schm: {
        description: "scheme type box",
        hasChild: false,
        display: unknown.preview_html
    },
    schi: {
        description: "scheme information box",
        hasChild: false,
        display: unknown.preview_html
    },
    iinf: {
        description: "item information",
        hasChild: false,
        display: unknown.preview_html
    },
    xml: {
        description: "XML container",
        hasChild: false,
        display: unknown.preview_html
    },
    bxml: {
        description: "binary XML container",
        hasChild: false,
        display: unknown.preview_html
    },
    pitm: {
        description: "primary item reference",
        hasChild: false,
        display: unknown.preview_html
    },
    gps0: {
        description: "geolocation information",
        hasChild: false,
        display: kv_table.preview_html,
        parser: parser.parseGpsX
    }
};
