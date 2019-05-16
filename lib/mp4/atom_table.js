const hex = require('../hex')
const parser = require('./atom_parser')

module.exports.atom = {
    ftyp: {
        description: "file type and compatibility",
        hasChild: false,
        display: parser.parseFileTypeBox
    },
    pdin: {
        description: "progressive download information",
        hasChild: false,
        display: hex.outputHex
    },
    moov: {
        description: "container for all the metadata",
        hasChild: true,
        display: hex.outputHex
    },
    mvhd: {
        description: "movie header, overall declarations",
        hasChild: false,
        display: parser.parseMovieHeaderBox
    },
    trak: {
        description: "container for an individual track or stream",
        hasChild: true,
        display: hex.outputHex
    },
    tkhd: {
        description: "track header, overall information about the track",
        hasChild: false,
        display: parser.parseTrackHeaderBox
    },
    tref: {
        description: "track reference container",
        hasChild: false,
        display: parser.parseTrackReferenceBox
    },
    edts: {
        description: "edit list container",
        hasChild: true,
        display: hex.outputHex
    },
    elst: {
        description: "an edit list",
        hasChild: false,
        display: hex.outputHex
    },
    mdia: {
        description: "container for the media information in a track",
        hasChild: true,
        display: hex.outputHex
    },
    mdhd: {
        description: "media header, overall information about the media",
        hasChild: false,
        display: parser.parseMediaHeaderBox
    },
    hdlr: {
        description: "handler, declares the media (handler) type",
        hasChild: false,
        display: parser.parseHandlerReferenceBox
    },
    minf: {
        description: "media information container",
        hasChild: true,
        display: hex.outputHex
    },
    vmhd: {
        description: "video media header, overall information (video track only)",
        hasChild: false,
        display: parser.parseVideoMediaHeaderBox
    },
    smhd: {
        description: "sound media header, overall information (sound track only)",
        hasChild: false,
        display: parser.parseSoundMediaHeaderBox
    },
    hmhd: {
        description: "hint media header, overall information (hint track only)",
        hasChild: false,
        display: parser.parseHintMediaHeaderBox
    },
    nmhd: {
        description: "Null media header, overall information (some tracks only)",
        hasChild: false,
        display: hex.outputHex
    },
    dinf: {
        description: "data information box, container",
        hasChild: true,
        display: hex.outputHex
    },
    dref: {
        description: "data reference box, declares source(s) of media data in track",
        hasChild: false,
        display: hex.outputHex
    },
    stbl: {
        description: "sample table box, container for the time/space map",
        hasChild: true,
        display: hex.outputHex
    },
    stsd: {
        description: "sample descriptions (codec types, initialization etc.)",
        hasChild: false,
        display: hex.outputHex
    },
    stts: {
        description: "(decoding) time-to-sample",
        hasChild: false,
        display: hex.outputHex
    },
    ctts: {
        description: "(composition) time to sample",
        hasChild: false,
        display: hex.outputHex
    },
    stsc: {
        description: "sample-to-chunk, partial data-offset information",
        hasChild: false,
        display: hex.outputHex
    },
    stsz: {
        description: "sample sizes (framing)",
        hasChild: false,
        display: hex.outputHex
    },
    stz2: {
        description: "compact sample sizes (framing)",
        hasChild: false,
        display: hex.outputHex
    },
    stco: {
        description: "chunk offset, partial data-offset information",
        hasChild: false,
        display: hex.outputHex
    },
    co64: {
        description: "64-bit chunk offset",
        hasChild: false,
        display: hex.outputHex
    },
    stss: {
        description: "sync sample table (random access points)",
        hasChild: false,
        display: hex.outputHex
    },
    stsh: {
        description: "shadow sync sample table",
        hasChild: false,
        display: hex.outputHex
    },
    padb: {
        description: "sample padding bits",
        hasChild: false,
        display: hex.outputHex
    },
    stdp: {
        description: "sample degradation priority",
        hasChild: false,
        display: hex.outputHex
    },
    sdtp: {
        description: "independent and disposable samples",
        hasChild: false,
        display: hex.outputHex
    },
    sbgp: {
        description: "sample-to-group",
        hasChild: false,
        display: hex.outputHex
    },
    sgpd: {
        description: "sample group description",
        hasChild: false,
        display: hex.outputHex
    },
    subs: {
        description: "sub-sample information",
        hasChild: false,
        display: hex.outputHex
    },
    mvex: {
        description: "movie extends box",
        hasChild: true,
        display: hex.outputHex
    },
    mehd: {
        description: "movie extends header box",
        hasChild: false,
        display: parser.parseMovieExtendsHeaderBox
    },
    trex: {
        description: "track extends defaults",
        hasChild: false,
        display: hex.outputHex
    },
    ipmc: {
        description: "IPMP Control Box",
        hasChild: false,
        display: hex.outputHex
    },
    moof: {
        description: "movie fragment",
        hasChild: true,
        display: hex.outputHex
    },
    mfhd: {
        description: "movie fragment header",
        hasChild: false,
        display: parser.parseMovieFragmentHeaderBox
    },
    traf: {
        description: "track fragment",
        hasChild: true,
        display: hex.outputHex
    },
    tfhd: {
        description: "track fragment header",
        hasChild: false,
        display: parser.parseTrackFragmentHeaderBox
    },
    trun: {
        description: "track fragment run",
        hasChild: false,
        display: parser.parseTrackFragmentRunBox
    },
    sdtp: {
        description: "independent and disposable samples",
        hasChild: false,
        display: hex.outputHex
    },
    sbgp: {
        description: "sample-to-group",
        hasChild: false,
        display: hex.outputHex
    },
    subs: {
        description: "sub-sample information",
        hasChild: false,
        display: hex.outputHex
    },
    mfra: {
        description: "movie fragment random access",
        hasChild: true,
        display: hex.outputHex
    },
    tfra: {
        description: "track fragment random access",
        hasChild: false,
        display: hex.outputHex
    },
    mfro: {
        description: "movie fragment random access offset",
        hasChild: false,
        display: hex.outputHex
    },
    mdat: {
        description: "media data container",
        hasChild: false,
        display: hex.outputHex
    },
    free: {
        description: "free space",
        hasChild: false,
        display: hex.outputHex
    },
    skip: {
        description: "free space",
        hasChild: true,
        display: hex.outputHex
    },
    udta: {
        description: "User data",
        hasChild: true,
        display: hex.outputHex
    },
    cprt: {
        description: "copyright etc.",
        hasChild: false,
        display: hex.outputHex
    },
    meta: {
        description: "metadata",
        hasChild: true,
        display: hex.outputHex
    },
    dinf: {
        description: "data information box, container",
        hasChild: true,
        display: hex.outputHex
    },
    dref: {
        description: "data reference box, declares source(s) of metadata items",
        hasChild: false,
        display: hex.outputHex
    },
    ipmc: {
        description: "IPMP Control Box",
        hasChild: false,
        display: hex.outputHex
    },
    iloc: {
        description: "item location",
        hasChild: false,
        display: hex.outputHex
    },
    ipro: {
        description: "item protection",
        hasChild: true,
        display: hex.outputHex
    },
    sinf: {
        description: "protection scheme information box",
        hasChild: true,
        display: hex.outputHex
    },
    frma: {
        description: "original format box",
        hasChild: false,
        display: hex.outputHex
    },
    imif: {
        description: "IPMP Information box",
        hasChild: false,
        display: hex.outputHex
    },
    schm: {
        description: "scheme type box",
        hasChild: false,
        display: hex.outputHex
    },
    schi: {
        description: "scheme information box",
        hasChild: false,
        display: hex.outputHex
    },
    iinf: {
        description: "item information",
        hasChild: false,
        display: hex.outputHex
    },
    xml: {
        description: "XML container",
        hasChild: false,
        display: hex.outputHex
    },
    bxml: {
        description: "binary XML container",
        hasChild: false,
        display: hex.outputHex
    },
    pitm: {
        description: "primary item reference",
        hasChild: false,
        display: hex.outputHex
    }
};
