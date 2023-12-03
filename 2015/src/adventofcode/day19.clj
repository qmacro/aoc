(ns adventofcode.day19
  (:require [clojure.string :as str]))

(def input
  (map str/trim-newline
       (-> "resources/day19input"
           slurp
           (str/split #"\n\n"))))

;; The transforms, as a simple seq of vectors
;; e.g. (["H" "HO"] ["H" "OH"] ["O" "HH"])
(def transforms
  (map #(str/split % #" => ")
       (str/split-lines (first input))))

;; The starting molecule
(def molecule (last input))

;; Stick a ! on the end of a string
(defn en-pling
  [s]
  (str s "!"))

;; Remove a ! from the end of the string
(defn de-pling
  [s]
  (first (str/split s #"!")))

;; Return a molecule substitution result, given the
;; starting molecule, a position to make the substitution,
;; and the from and to parts.
(defn substitute
  [molecule position [from to]]
  (let [molecule+ (en-pling molecule)]
    (->> (str/split molecule+ (re-pattern from))
         (split-at position)
         (map #(str/join from %))
         (str/join to)
         (de-pling))))

(def new-molecules
  (loop
    [ts transforms
     new-molecules []]
    (if (empty? ts)
      new-molecules
      (let [from-to (first ts)
            n (count (re-seq (re-pattern (first from-to)) molecule))
            new (map #(substitute molecule % from-to) (range 1 (inc n)))]
        (recur (rest ts) (conj new-molecules new))))))

(count (into #{} (flatten new-molecules)))



