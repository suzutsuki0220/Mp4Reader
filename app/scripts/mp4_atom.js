const atom_view = require('./mp4_atom_view')

module.exports.atom = {
    ftyp: {
        description: "file type and compatibility",
        hasChild: false,
        display: atom_view.parseFileTypeBox
    },
    pdin: {
        description: "progressive download information",
        hasChild: false,
        display: atom_view.outputHex
    },
    moov: {
        description: "container for all the metadata",
        hasChild: true,
        display: atom_view.outputHex
    },
    mvhd: {
        description: "movie header, overall declarations",
        hasChild: false,
        display: atom_view.parseMovieHeaderBox
    },
    trak: {
        description: "container for an individual track or stream",
        hasChild: true,
        display: atom_view.outputHex
    },
    tkhd: {
        description: "track header, overall information about the track",
        hasChild: false,
        display: atom_view.outputHex
    },
    tref: {
        description: "track reference container",
        hasChild: false,
        display: atom_view.outputHex
    },
    edts: {
        description: "edit list container",
        hasChild: true,
        display: atom_view.outputHex
    },
    elst: {
        description: "an edit list",
        hasChild: false,
        display: atom_view.outputHex
    },
    mdia: {
        description: "container for the media information in a track",
        hasChild: true,
        display: atom_view.outputHex
    },
    mdhd: {
        description: "media header, overall information about the media",
        hasChild: false,
        display: atom_view.outputHex
    },
    hdlr: {
        description: "handler, declares the media (handler) type",
        hasChild: false,
        display: atom_view.outputHex
    },
    minf: {
        description: "media information container",
        hasChild: true,
        display: atom_view.outputHex
    },
    vmhd: {
        description: "video media header, overall information (video track only)",
        hasChild: false,
        display: atom_view.outputHex
    },
    smhd: {
        description: "sound media header, overall information (sound track only)",
        hasChild: false,
        display: atom_view.outputHex
    },
    hmhd: {
        description: "hint media header, overall information (hint track only)",
        hasChild: false,
        display: atom_view.outputHex
    },
    nmhd: {
        description: "Null media header, overall information (some tracks only)",
        hasChild: false,
        display: atom_view.outputHex
    },
    dinf: {
        description: "data information box, container",
        hasChild: true,
        display: atom_view.outputHex
    },
    dref: {
        description: "data reference box, declares source(s) of media data in track",
        hasChild: false,
        display: atom_view.outputHex
    },
    stbl: {
        description: "sample table box, container for the time/space map",
        hasChild: true,
        display: atom_view.outputHex
    },
    stsd: {
        description: "sample descriptions (codec types, initialization etc.)",
        hasChild: false,
        display: atom_view.outputHex
    },
    stts: {
        description: "(decoding) time-to-sample",
        hasChild: false,
        display: atom_view.outputHex
    },
    ctts: {
        description: "(composition) time to sample",
        hasChild: false,
        display: atom_view.outputHex
    },
    stsc: {
        description: "sample-to-chunk, partial data-offset information",
        hasChild: false,
        display: atom_view.outputHex
    },
    stsz: {
        description: "sample sizes (framing)",
        hasChild: false,
        display: atom_view.outputHex
    },
    stz2: {
        description: "compact sample sizes (framing)",
        hasChild: false,
        display: atom_view.outputHex
    },
    stco: {
        description: "chunk offset, partial data-offset information",
        hasChild: false,
        display: atom_view.outputHex
    },
    co64: {
        description: "64-bit chunk offset",
        hasChild: false,
        display: atom_view.outputHex
    },
    stss: {
        description: "sync sample table (random access points)",
        hasChild: false,
        display: atom_view.outputHex
    },
    stsh: {
        description: "shadow sync sample table",
        hasChild: false,
        display: atom_view.outputHex
    },
    padb: {
        description: "sample padding bits",
        hasChild: false,
        display: atom_view.outputHex
    },
    stdp: {
        description: "sample degradation priority",
        hasChild: false,
        display: atom_view.outputHex
    },
    sdtp: {
        description: "independent and disposable samples",
        hasChild: false,
        display: atom_view.outputHex
    },
    sbgp: {
        description: "sample-to-group",
        hasChild: false,
        display: atom_view.outputHex
    },
    sgpd: {
        description: "sample group description",
        hasChild: false,
        display: atom_view.outputHex
    },
    subs: {
        description: "sub-sample information",
        hasChild: false,
        display: atom_view.outputHex
    },
    mvex: {
        description: "movie extends box",
        hasChild: true,
        display: atom_view.outputHex
    },
    mehd: {
        description: "movie extends header box",
        hasChild: false,
        display: atom_view.outputHex
    },
    trex: {
        description: "track extends defaults",
        hasChild: false,
        display: atom_view.outputHex
    },
    ipmc: {
        description: "IPMP Control Box",
        hasChild: false,
        display: atom_view.outputHex
    },
    moof: {
        description: "movie fragment",
        hasChild: true,
        display: atom_view.outputHex
    },
    mfhd: {
        description: "movie fragment header",
        hasChild: false,
        display: atom_view.outputHex
    },
    traf: {
        description: "track fragment",
        hasChild: true,
        display: atom_view.outputHex
    },
    tfhd: {
        description: "track fragment header",
        hasChild: false,
        display: atom_view.outputHex
    },
    trun: {
        description: "track fragment run",
        hasChild: false,
        display: atom_view.outputHex
    },
    sdtp: {
        description: "independent and disposable samples",
        hasChild: false,
        display: atom_view.outputHex
    },
    sbgp: {
        description: "sample-to-group",
        hasChild: false,
        display: atom_view.outputHex
    },
    subs: {
        description: "sub-sample information",
        hasChild: false,
        display: atom_view.outputHex
    },
    mfra: {
        description: "movie fragment random access",
        hasChild: true,
        display: atom_view.outputHex
    },
    tfra: {
        description: "track fragment random access",
        hasChild: false,
        display: atom_view.outputHex
    },
    mfro: {
        description: "movie fragment random access offset",
        hasChild: false,
        display: atom_view.outputHex
    },
    mdat: {
        description: "media data container",
        hasChild: false,
        display: atom_view.outputHex
    },
    free: {
        description: "free space",
        hasChild: false,
        display: atom_view.outputHex
    },
    skip: {
        description: "free space",
        hasChild: true,
        display: atom_view.outputHex
    },
    udta: {
        description: "User data",
        hasChild: true,
        display: atom_view.outputHex
    },
    cprt: {
        description: "copyright etc.",
        hasChild: false,
        display: atom_view.outputHex
    },
    meta: {
        description: "metadata",
        hasChild: true,
        display: atom_view.outputHex
    },
    hdlr: {
        description: "handler, declares the metadata (handler) type",
        hasChild: false,
        display: atom_view.outputHex
    },
    dinf: {
        description: "data information box, container",
        hasChild: true,
        display: atom_view.outputHex
    },
    dref: {
        description: "data reference box, declares source(s) of metadata items",
        hasChild: false,
        display: atom_view.outputHex
    },
    ipmc: {
        description: "IPMP Control Box",
        hasChild: false,
        display: atom_view.outputHex
    },
    iloc: {
        description: "item location",
        hasChild: false,
        display: atom_view.outputHex
    },
    ipro: {
        description: "item protection",
        hasChild: true,
        display: atom_view.outputHex
    },
    sinf: {
        description: "protection scheme information box",
        hasChild: true,
        display: atom_view.outputHex
    },
    frma: {
        description: "original format box",
        hasChild: false,
        display: atom_view.outputHex
    },
    imif: {
        description: "IPMP Information box",
        hasChild: false,
        display: atom_view.outputHex
    },
    schm: {
        description: "scheme type box",
        hasChild: false,
        display: atom_view.outputHex
    },
    schi: {
        description: "scheme information box",
        hasChild: false,
        display: atom_view.outputHex
    },
    iinf: {
        description: "item information",
        hasChild: false,
        display: atom_view.outputHex
    },
    xml: {
        description: "XML container",
        hasChild: false,
        display: atom_view.outputHex
    },
    bxml: {
        description: "binary XML container",
        hasChild: false,
        display: atom_view.outputHex
    },
    pitm: {
        description: "primary item reference",
        hasChild: false,
        display: atom_view.outputHex
    }
};
